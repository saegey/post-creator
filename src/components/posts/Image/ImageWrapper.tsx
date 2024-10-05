import React, { useState, useCallback } from "react";
import {
  useSlateStatic,
  ReactEditor,
  useSelected,
  useFocused,
} from "slate-react";

import ImageFullScreen from "./ImageFullScreen";
import HoverAction from "../Editor/HoverAction";
import { useViewport } from "../../ViewportProvider";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";
import { ImageElementType } from "../../../types/common";
import useImageMeta from "../../../hooks/useImageMeta";
import ImageMissing from "./ImageMissing";
import ImageBase from "./ImageBase";
import { Box } from "theme-ui";
import { EditorContext } from "../Editor/EditorContext";
import withComponentClick from "../withComponentClick";

// Component for rendering the options menu with memoization
const OptionsMenuMemo = ({ optionsMenu }: { optionsMenu: JSX.Element }) => {
  return optionsMenu;
};

const ImageWrapper = ({ element }: { element: ImageElementType }) => {
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
        <>
          <ImageMissing />
          <OptionsMenuMemo optionsMenu={optionsMenu} />
        </>
      </HoverAction>
    );
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

  const EnhancedBox = withComponentClick(Box);

  return (
    <>
      <HoverAction element={element}>
        <EnhancedBox
          element={element}
          path={path} // Pass the required props to the HOC
          sx={{
            cursor: "pointer",
          }}
          onClick={() => {
            alert("clicked");
          }}
        >
          {imageBase}
          <OptionsMenuMemo optionsMenu={optionsMenu} />
        </EnhancedBox>
      </HoverAction>
      {isMaximized && imageMeta && (
        <ImageFullScreen
          setIsMaximized={setIsMaximized}
          index={imageMetaIndex}
        />
      )}
    </>
  );
};

export default ImageWrapper;
