import React from "react";
import { Box } from "theme-ui";
import PublicHeader from "./Header/PublicHeader";
import PublicFooter from "./Footer/Footer";

const BlogPostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      as="main"
      sx={{
        height: "fit-content",
        width: "100vw",
        backgroundColor: "background",
      }}
    >
      <PublicHeader />
      {children}
      <PublicFooter />
    </Box>
  );
};

export default BlogPostLayout;
