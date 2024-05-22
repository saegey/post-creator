module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dprifih4o/**",
      },
    ],
    domains: ["res.cloudinary.com"],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  // trailingSlash: true,

  // exclude: ['amplify'],
};
