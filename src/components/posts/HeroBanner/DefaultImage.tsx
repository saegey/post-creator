import { Box, Flex, Button } from "theme-ui";
import React from "react";

import { EditorContext } from "../Editor/EditorContext";

const DefaultImage = () => {
  const { setIsImageUploadOpen } = React.useContext(EditorContext);

  return (
    <Flex
      sx={{
        width: ["100%", "65%", "65%"],
        height: "400px",
        background: "surfaceAccent",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Flex sx={{ alignItems: "center" }}>
        <Box>
          <Button
            onClick={() => setIsImageUploadOpen(true)}
            variant="primaryButton"
          >
            Add Image
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default DefaultImage;
