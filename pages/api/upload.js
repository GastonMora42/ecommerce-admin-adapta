import { Storage } from '@google-cloud/storage';
import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import multiparty from 'multiparty';
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

const base64Keyfile = process.env.GCLOUD_KEYFILE;
const keyFilename = path.join('/tmp', 'google-credentials.json');

fs.writeFileSync(keyFilename, Buffer.from(base64Keyfile, 'base64').toString('utf-8'));

const bucketName = 'bucket-adapta';

export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const storage = new Storage({ keyFilename });
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split('.').pop();
    const newFilename = Date.now() + '.' + ext;
    await storage.bucket(bucketName).upload(file.path, {
      destination: newFilename,
      metadata: {
        contentType: mime.lookup(file.path),
        cacheControl: 'public, max-age=31536000',
      },
    });

    const [url] = await storage.bucket(bucketName).file(newFilename).getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });

    links.push(url);
  }

  // Borra el archivo temporal después de usarlo
  fs.unlinkSync(keyFilename);

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};