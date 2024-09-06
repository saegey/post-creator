import React, { useState, useContext } from "react";
import { useSlateStatic } from "slate-react";
import { Path, Transforms } from "slate";
import { Button, Label, Textarea, Flex, Text } from "theme-ui";

import { PostSaveComponents } from "../../../actions/PostSave";
import { PostContext } from "../../PostContext";
import { ImageElementType } from "../../../types/common";
import StandardModal from "../../shared/StandardModal";

const ImageCaption = ({
  element,
  path,
}: {
  element: ImageElementType;
  path: Path;
}) => {
  const editor = useSlateStatic();
  const [addCaption, setAddCaption] = useState(false);
  const { id } = useContext(PostContext);

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
