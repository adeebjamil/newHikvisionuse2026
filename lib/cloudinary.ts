import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const uploadToCloudinary = async (fileUri: string, folder: string) => {
  try {
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: `hikvision_uae/${folder}`,
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export const uploadBufferToCloudinary = async (buffer: Buffer, folder: string) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `hikvision_uae/${folder}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
};
