// const cloudUrl = process.env["NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"];

const cloudUrl =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  process.env.CLOUDINARY_CLOUD_NAME;

export { cloudUrl };
