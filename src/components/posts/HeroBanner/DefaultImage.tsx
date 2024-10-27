import { Box, Flex } from "theme-ui";
import React from "react";

import { EditorContext } from "../Editor/EditorContext";
import UploadIcon from "../../icons/UploadIcon";
import Button from "../../shared/Button";

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
            icon={UploadIcon}
            sx={{ width: "fit-content" }}
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
