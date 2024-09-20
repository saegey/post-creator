import { Box } from "theme-ui";

import { CloudinaryImage, ImageElementType } from "../../../types/common";
import CloudImage from "./CloudImage";
import ImageCaption from "./ImageCaption";

const ImageBase = (props: {
  imageUrl: string;
  imageMeta: CloudinaryImage;
  handleMaximize: () => void;
  selected: boolean;
  focused: boolean;
  element: ImageElementType;
}) => {
  const { imageUrl, imageMeta, handleMaximize, selected, focused, element } =
    props;

  return (
    <Box contentEditable={false}>
      <CloudImage
        imageUrl={imageUrl}
        imageMeta={imageMeta}
        selected={selected}
        focused={focused}
        onMaximize={handleMaximize}
      />
      <ImageCaption element={element} />
    </Box>
  );
};

export default ImageBase;
