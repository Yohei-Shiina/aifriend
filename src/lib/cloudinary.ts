import streamifier from 'streamifier';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadBufferToCloudinary = (buffer: Buffer, publicId: string): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "aifriend", public_id: publicId, overwrite: false },
      (err, result) => {
        if (err) return reject(err);
        if (!result) return reject(new Error("Upload failed: No result returned from Cloudinary"));
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

export const destroyImageFromCloudinary = (publicId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (err, result) => {
      if (err) return reject(err);
      if (result.result !== 'ok') return reject(new Error(`Failed to delete image: ${result.result}`));
      resolve();
    });
  });
}