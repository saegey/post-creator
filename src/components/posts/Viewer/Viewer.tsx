import React from "react";
import { Box, Flex } from "theme-ui";

import { RenderNode } from "../../shared/Render";
import { CustomElement } from "../../../types/common";
import useFetchData from "../../../hooks/useFetchData";

const Viewer = ({ components }: { components: CustomElement[] }) => {
  useFetchData({ securityLevel: "public" });

  return (
    <Flex>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "background",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        {components.map((node: any, index: number) => (
          <React.Fragment key={index}>{RenderNode(node)}</React.Fragment>
        ))}
      </Box>
    </Flex>
  );
};

export default Viewer;
