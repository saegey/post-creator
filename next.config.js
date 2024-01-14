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
  trailingSlash: true,

  // exclude: ['amplify'],
};
