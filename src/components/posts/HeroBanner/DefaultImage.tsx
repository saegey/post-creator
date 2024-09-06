import { Box, Flex, Button, IconButton } from "theme-ui";
import React from "react";

import { EditorContext } from "../Editor/EditorContext";
import UploadIcon from "../../icons/UploadIcon";

const DefaultImage = () => {
  const { setIsHeroImageModalOpen } = React.useContext(EditorContext);

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
          <IconButton
            onClick={() => {
              setIsHeroImageModalOpen(true);
              console.log("default image clicked");
            }}
            sx={{
              backgroundColor: "primary",
              color: "background",
              "&:hover": { backgroundColor: "primaryHover" },
            }}
          >
            <UploadIcon />
          </IconButton>
        </Box>
      </Flex>
    </Flex>
  );
};

export default DefaultImage;
