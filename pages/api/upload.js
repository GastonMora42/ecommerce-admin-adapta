import { Storage } from '@google-cloud/storage';
import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import multiparty from 'multiparty';
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

const keyFilename = path.resolve(process.env.GCLOUD_KEYFILE); // Resolver la ruta absoluta
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

  // Convertir archivo JSON a Base64
  const file = files.file[0]; // Suponiendo que solo hay un archivo
  const jsonBuffer = fs.readFileSync(file.path);
  const base64Json = jsonBuffer.toString('base64');

  // Subir JSON en Base64 a Google Cloud Storage
  const newFilename = Date.now() + '.json'; // Nombre de archivo en el bucket
  await storage.bucket(bucketName).upload(Buffer.from(base64Json, 'base64'), {
    destination: newFilename,
    metadata: {
      contentType: 'application/json',
      cacheControl: 'public, max-age=31536000',
    },
  });

  // Obtener URL firmada para leer el archivo desde Storage
  const [url] = await storage.bucket(bucketName).file(newFilename).getSignedUrl({
    action: 'read',
    expires: '03-09-2491', // Puedes ajustar esta fecha según sea necesario
  });

  links.push(url);

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
