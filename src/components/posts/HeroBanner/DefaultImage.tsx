import { Box, Button, Flex, Text } from "theme-ui";
import React from "react";

import { EditorContext } from "../Editor/EditorContext";
import UploadIcon from "../../icons/UploadIcon";

const DefaultImage = () => {
  const { setIsChangeImageModalOpen } = React.useContext(EditorContext);

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
            onClick={() => {
              setIsChangeImageModalOpen(true);
            }}
            sx={{ width: "fit-content" }}
            variant="primaryButton"
          >
            <Flex sx={{ gap: "10px" }}>
              <Box sx={{ width: "20px", height: "20px" }}>
                <UploadIcon />
              </Box>
              <Text>Upload Image</Text>
            </Flex>
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default DefaultImage;
