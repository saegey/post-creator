import React, { useState, useCallback } from "react";
import { useSelected, useFocused } from "slate-react";

import ImageFullScreen from "./ImageFullScreen";
import { useViewport } from "../../ViewportProvider";
import { ImageElementType } from "../../../types/common";
import useImageMeta from "../../../hooks/useImageMeta";
import ImageBase from "./ImageBase";
import { Box } from "theme-ui";

const ImageView = ({ element }: { element: ImageElementType }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const { width } = useViewport();

  const imageData = useImageMeta(element, width);
  const imageMeta =
    imageData && imageData.imageMeta ? imageData.imageMeta : undefined;

  if (!imageMeta) {
    throw new Error("Image metadata not found");
  }

  const { imageUrl, imageMetaIndex } = imageData;

  const selected = useSelected();
  const focused = useFocused();

  const handleMaximize = useCallback(() => {
    setIsMaximized(true);
  }, []);

  const imageBase = React.useMemo(() => {
    return (
      <ImageBase
        imageUrl={imageUrl}
        imageMeta={imageMeta}
        selected={selected}
        focused={focused}
        handleMaximize={handleMaximize}
        element={element}
      />
    );
  }, [imageUrl, imageMeta, selected, focused, element]);

  return (
    <Box
      sx={{
        position: "relative",
        width: ["100%", "690px", "690px"],
        marginX: "auto",
        marginY: "20px",
      }}
    >
      {isMaximized && imageMeta && (
        <ImageFullScreen
          setIsMaximized={setIsMaximized}
          index={imageMetaIndex}
        />
      )}
      {imageBase}
    </Box>
  );
};

export default ImageView;
