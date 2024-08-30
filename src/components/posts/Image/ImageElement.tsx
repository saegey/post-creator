import React, { useState, useCallback, useContext } from "react";
import {
  useSlateStatic,
  ReactEditor,
  useSelected,
  useFocused,
} from "slate-react";
import { Box, Theme, ThemeUIStyleObject } from "theme-ui";
import { getCldImageUrl } from "next-cloudinary";

import { PostContext } from "../../PostContext";
import { cloudUrl } from "../../../utils/cloudinary";
import ImageFullScreen from "./ImageFullScreen";
import HoverAction from "../Editor/HoverAction";

import { useViewport } from "../../ViewportProvider";
import ImageCaption from "./ImageCaption";
import { CloudinaryImage, ImageElementType } from "../../../types/common";
import CloudImage from "./CloudImage";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";

const ImageElement = ({
  children,
  element,
}: {
  element: ImageElementType;
  children: JSX.Element;
}) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const [isMaximized, setIsMaximized] = useState(false);
  const { width } = useViewport();
  const { images } = useContext(PostContext);
  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);

  const { imageMeta, imageUrl, imageMetaIndex } = React.useMemo(() => {
    const imageMetaIndex = images?.findIndex(
      (i) => i.public_id === element.public_id
    );
    if (imageMetaIndex === undefined || imageMetaIndex === -1) {
      return null;
    }

    const imageMeta = images ? images[imageMetaIndex] : undefined;
    const imageWidth = width < 690 ? width : 690;
    if (!imageMeta?.height || !imageMeta.width) {
      return null;
    }

    const imageUrl = getCldImageUrl(
      {
        src: element.public_id,
        width: imageWidth,
        height: imageMeta.height / (imageMeta.width / imageWidth),
      },
      {
        cloud: {
          cloudName: cloudUrl,
        },
      }
    );
    return { imageMeta, imageUrl, imageMetaIndex };
  }, [images, element, width]) as {
    imageMeta: CloudinaryImage;
    imageUrl: string;
    imageMetaIndex: number;
  };

  const selected = useSelected();
  const focused = useFocused();

  const handleMaximize = useCallback(() => {
    setIsMaximized(true);
  }, []);

  const cloudImageMemo = React.useMemo(() => {
    return (
      <CloudImage
        imageUrl={imageUrl}
        imageMeta={imageMeta}
        selected={selected}
        focused={focused}
        onMaximize={handleMaximize}
      />
    );
  }, [imageUrl, imageMeta]);

  const optionsMenuMemo = React.useMemo(() => {
    return optionsMenu;
  }, [isOptionsOpen]);

  return (
    <HoverAction element={element}>
      <Box contentEditable={false}>
        {isMaximized && imageMeta && (
          <ImageFullScreen
            setIsMaximized={setIsMaximized}
            index={imageMetaIndex}
          />
        )}
        <Box
          sx={
            {
              marginY: ["20px"],
              height: "fit-content",
              marginBottom: "20px",
            } as ThemeUIStyleObject<Theme>
          }
        >
          {cloudImageMemo}
          <ImageCaption element={element} path={path} />
          {optionsMenuMemo}
        </Box>
        {children}
      </Box>
    </HoverAction>
  );
};

export default ImageElement;
