import React from "react";
import { Path } from "slate";
import { Text } from "theme-ui";

import { ImageElementType } from "../../../types/common";

const ImageCaption = ({ element }: { element: ImageElementType }) => {
  return (
    <>
      {element.photoCaption && (
        <Text as="figcaption" sx={{ fontSize: "14px", marginTop: "5px" }}>
          {element.photoCaption}
        </Text>
      )}
    </>
  );
};

export default ImageCaption;
