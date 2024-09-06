import React from "react";
import { Label, Textarea, Button, Flex } from "theme-ui";
import { Editor, Path, Transforms } from "slate";

import { EditorContext } from "../Editor/EditorContext";
import StandardModal from "../../shared/StandardModal";
import { HeroBannerType, ImageElementType } from "../../../types/common";
import { useSlateContext } from "../../SlateContext";

const PhotoCaptionModal = () => {
  const { editor } = useSlateContext();
  const { menuPosition, setIsPhotoCaptionOpen, isPhotoCaptionOpen } =
    React.useContext(EditorContext);
  console.log("currentPath", menuPosition);
  if (!editor) {
    throw new Error("Editor is not defined");
  }

  if (menuPosition.path.length === 0) {
    console.log("menuPosition.path.length === 0");
  }
  const [node] = Editor.node(
    editor,
    menuPosition.path.length === 0 ? [0] : menuPosition.path
  ) as [ImageElementType | HeroBannerType, Path];

  Transforms.setNodes(
    editor,
    {
      ...node,
      photoCaption: "image",
    } as HeroBannerType,
    {
      at: menuPosition.path,
    }
  );

  console.log("node", node);
  // const editor = useSlateStatic();
  // const path = ReactEditor.findPath(editor, element);

  return (
    <>
      <StandardModal
        // title=""
        topRight={<></>}
        isOpen={isPhotoCaptionOpen}
        setIsOpen={setIsPhotoCaptionOpen}
      >
        <Flex
          sx={{
            width: "100%",
            height: "fit-content",
          }}
        >
          <form
            style={{ width: "100%" }}
            onSubmit={(event: any) => {
              event.preventDefault();
              const form = new FormData(event.target);
              const caption = form.get("caption");

              console.log({
                photoCaption: caption?.toString(),
                at: menuPosition.path.length === 0 ? [0] : menuPosition.path,
              });

              Transforms.setNodes(
                editor,
                {
                  ...node,
                  photoCaption: caption?.toString(),
                } as ImageElementType,
                {
                  // This path references the editor, and is expanded to a range that
                  // will encompass all the content of the editor.
                  at: menuPosition.path.length === 0 ? [0] : menuPosition.path,
                }
              );
              setIsPhotoCaptionOpen(false);
            }}
          >
            <Label sx={{ color: "text", marginY: "10px" }} htmlFor="caption">
              Edit Caption
            </Label>
            <Textarea
              sx={{
                borderColor: "border",
                borderWidth: "1px",
                backgroundColor: "surface",
                borderStyle: "solid",
                width: "100%", // Ensures the textarea spans the full width
                flexGrow: 1, // Ensure it grows to fill the available space in flex containers
                boxSizing: "border-box", // Ensures padding and border are included in the element’s width
              }}
              name="caption"
              id="caption"
              rows={6}
              mb={3}
              // value={"sfdf"}
              defaultValue={node.photoCaption}
            ></Textarea>
            <Flex sx={{ justifyContent: "flex-end", gap: "10px" }}>
              <Button
                variant="secondaryButton"
                onClick={(event) => {
                  event.preventDefault();
                  setIsPhotoCaptionOpen(false);
                  console.log("cancelled");
                }}
              >
                Cancel
              </Button>
              <Button variant="primaryButton">Save</Button>
            </Flex>
          </form>
        </Flex>
      </StandardModal>
    </>
  );
};

export default PhotoCaptionModal;
