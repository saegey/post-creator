import React, { useState, useCallback } from "react";
import {
  useSlateStatic,
  ReactEditor,
  useSelected,
  useFocused,
} from "slate-react";
import {
  AspectRatio,
  Box,
  Flex,
  Text,
  Theme,
  ThemeUIStyleObject,
} from "theme-ui";

import ImageFullScreen from "./ImageFullScreen";
import HoverAction from "../Editor/HoverAction";
import { useViewport } from "../../ViewportProvider";
import ImageCaption from "./ImageCaption";
import CloudImage from "./CloudImage";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";
import { CloudinaryImage, ImageElementType } from "../../../types/common";
import useImageMeta from "../../../hooks/useImageMeta";
import ImagesIcon from "../../icons/ImagesIcon";

// Component for rendering the CloudImage with memoization
const CloudImageMemo = ({
  imageUrl,
  imageMeta,
  selected,
  focused,
  handleMaximize,
}: {
  imageUrl: string;
  imageMeta: CloudinaryImage;
  selected: boolean;
  focused: boolean;
  handleMaximize: () => void;
}) => {
  return (
    <CloudImage
      imageUrl={imageUrl}
      imageMeta={imageMeta}
      selected={selected}
      focused={focused}
      onMaximize={handleMaximize}
    />
  );
};

// Component for rendering the options menu with memoization
const OptionsMenuMemo = ({ optionsMenu }: { optionsMenu: JSX.Element }) => {
  return optionsMenu;
};

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
  const { optionsMenu } = useOptionsMenu(editor, path);

  const imageData = useImageMeta(element, width);
  const imageMeta =
    imageData && imageData.imageMeta ? imageData.imageMeta : undefined;

  if (!imageMeta) {
    return (
      <HoverAction element={element}>
        <Box contentEditable={false}>
          <Box>
            <AspectRatio
              ratio={16 / 9}
              sx={{
                // width: "100%",
                // height: "auto",

                backgroundColor: "error",
                borderRadius: [0, "5px", "5px"],
              }}
            >
              <Flex
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <ImagesIcon />
                <Text>Missing image</Text>
              </Flex>
            </AspectRatio>
            <OptionsMenuMemo optionsMenu={optionsMenu} />
          </Box>
        </Box>
      </HoverAction>
    );
  }

  const { imageUrl, imageMetaIndex } = imageData;

  const selected = useSelected();
  const focused = useFocused();

  const handleMaximize = useCallback(() => {
    setIsMaximized(true);
  }, []);

  return (
    <HoverAction element={element}>
      <Box contentEditable={false}>
        {isMaximized && imageMeta && (
          <ImageFullScreen
            setIsMaximized={setIsMaximized}
            index={imageMetaIndex}
          />
        )}
        <Box>
          <CloudImageMemo
            imageUrl={imageUrl}
            imageMeta={imageMeta}
            selected={selected}
            focused={focused}
            handleMaximize={handleMaximize}
          />
          <ImageCaption element={element} path={path} />
          <OptionsMenuMemo optionsMenu={optionsMenu} />
        </Box>
        {children}
      </Box>
    </HoverAction>
  );
};

export default ImageElement;
