import { Storage } from '@google-cloud/storage';
import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import multiparty from 'multiparty';
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

const keyFilename = path.join(process.cwd(), 'keyfile.json');
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
      expires: '03-09-2491', // Puedes ajustar esta fecha según sea necesario
    });

    links.push(url);
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
