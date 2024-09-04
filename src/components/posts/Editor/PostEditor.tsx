// PostEditor.tsx
import React, { useMemo, useCallback, useContext } from "react";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";
import { Flex, Box, Theme, ThemeUIStyleObject } from "theme-ui";

import withLayout from "../../plugins/withLayout";
import withLinks from "../../plugins/withLinks";
import EditorContent from "./EditorContent";

import MediaUploadHandler from "./MediaUploadHandler";
import { SlateProvider } from "../../SlateContext";
import { CustomElement } from "../../../types/common";
import { RWGPSModal } from "./AddRWGPS";
import RaceResultsImport from "../RaceResults/RaceResultsImport";
import MobileMenu from "./MobileMenu";
import { AddVideoModal } from "./AddVideo";
import OptionsDropdown from "../../OptionsDropdown";
import AddImage from "../Image/AddImage";
import FloatingMenu from "./FloatingMenu";
import Menu from "../../Menu";
import { EditorContext } from "./EditorContext";
import useSelectionChangeHandler from "../../../hooks/useSelectionChangeHandler";

const PostEditor = ({ initialState }: { initialState: CustomElement[] }) => {
  const editor = useMemo(
    () => withLayout(withHistory(withLinks(withReact(createEditor())))),
    []
  );
  const { selectionMenu, isChangingQuickly } =
    useSelectionChangeHandler(editor);

  const {
    isRaceResultsModalOpen,
    isOptionsOpen,
    isHeroImageModalOpen,
    isNewComponentMenuOpen,
    // selectionMenu,
    // isChangingQuickly,
    menuPosition,
    setMenuPosition,
  } = useContext(EditorContext);
  console.log("sekection:", selectionMenu);
  return (
    <Flex>
      <Box
        sx={
          {
            minWidth: "100%",
            margin: "0 auto 50px auto",
            width: "100%",
            backgroundColor: "background",
            borderRadius: "10px",
            padding: "0px",
            position: "relative",
          } as ThemeUIStyleObject<Theme>
        }
      >
        {/* SlateProvider wrapping the editor */}
        <SlateProvider editor={editor}>
          <EditorContent editor={editor} initialState={initialState} />

          {isRaceResultsModalOpen && <RaceResultsImport />}
          <RWGPSModal />
          <MobileMenu />
          <AddVideoModal />
          {isOptionsOpen && <OptionsDropdown />}
          {selectionMenu && !isChangingQuickly && (
            <FloatingMenu top={selectionMenu.top} left={selectionMenu.left} />
          )}
          {isHeroImageModalOpen && <AddImage />}
          {isNewComponentMenuOpen && <Menu menuPosition={menuPosition} />}

          <MediaUploadHandler />
        </SlateProvider>
      </Box>
    </Flex>
  );
};

export default PostEditor;
