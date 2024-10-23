import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { supabaseStorageEndpoint, supabaseKey } from "./supabase";

const uppy = new Uppy().use(Tus, {
  endpoint: supabaseStorageEndpoint,
  headers: {
    authorization: `Bearer ${supabaseKey}`,
    apikey: supabaseKey,
  },

  uploadDataDuringCreation: true,
  chunkSize: 6 * 1024 * 1024, //  6mb per chunk
  allowedMetaFields: [
    "bucketName",
    "objectName",
    "contentType",
    "cacheControl",
  ],
});

export default uppy;
