import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3Client = new S3Client({
  forcePathStyle: true,
  region: process.env.SUPABASE_REGION || "",
  endpoint: "https://bakurgmtpedjcnadobmy.supabase.co/storage/v1/s3",
  credentials: {
    accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY || "",
  },
});

export async function s3MiniUploadFile(file: File, fileName: string) {
  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  const command = new PutObjectCommand({
    Bucket: process.env.SUPABASE_BUCKET_ID,
    Key: fileName,
    ContentType: file.type,
    Body: fileBuffer,
  });

  const data = await s3Client.send(command);
  console.log("Upload successful:", data);
}
