import { Box, Flex, Button } from "theme-ui";
import React from "react";

import AddMediaComponent from "../Editor/AddMediaComponent";
import { lighten } from "@theme-ui/color";

const DefaultImage = () => {
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
          <AddMediaComponent
            uploadPreset="epcsmymp"
            onSuccess={async (result) => {
              console.log(result);
            }}
            renderButton={(open) => {
              // open();
              return (
                <Button onClick={open} variant="primaryButton">
                  Add Image
                </Button>
              );
            }}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default DefaultImage;
