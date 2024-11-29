import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Buffer } from "buffer";
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

async function s3UploadFile(file: File, fileName: string) {
  const fileStream = convertWebStreamToNodeStream(file.stream());

  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);
  console.log("Uploading with aws...");
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: process.env.SUPABASE_BUCKET_ID,
      Key: fileName,
      ContentType: file.type,
      Body: fileBuffer,
    },
  });

  await upload.done();
  console.log("Upload done.");
}

export { s3UploadFile };

// Helper function to convert a web ReadableStream to a Node.js Readable stream
function convertWebStreamToNodeStream(
  webStream: ReadableStream<Uint8Array>
): Readable {
  const reader = webStream.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) {
        this.push(null); // Signals the end of the stream
      } else {
        this.push(Buffer.from(value)); // Push data into the Node stream
      }
    },
  });
}
