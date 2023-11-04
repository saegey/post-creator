import React from "react";
import { Label, Textarea, Button, Box } from "theme-ui";
import { useSlateStatic, ReactEditor } from "slate-react";
import { Transforms } from "slate";

import { EditorContext } from "../Editor/EditorContext";
import StandardModal from "../../shared/StandardModal";
import { HeroBannerType, ImageElementType } from "../../../types/common";

const PhotoCaptionModal = ({
  element,
}: {
  element: ImageElementType | HeroBannerType;
}) => {
  const { isPhotoCaptionOpen, setIsPhotoCaptionOpen } =
    React.useContext(EditorContext);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  return (
    <>
      <StandardModal
        title="Add Caption"
        isOpen={isPhotoCaptionOpen}
        setIsOpen={setIsPhotoCaptionOpen}
      >
        <Box
          sx={{
            width: "80%",
            marginY: "auto",
            marginX: "auto",
            height: "80%",
          }}
        >
          <form
            onSubmit={(event: any) => {
              event.preventDefault();
              const form = new FormData(event.target);
              const caption = form.get("caption");

              Transforms.setNodes(
                editor,
                {
                  ...element,
                  photoCaption: caption?.toString(),
                } as ImageElementType,
                {
                  // This path references the editor, and is expanded to a range that
                  // will encompass all the content of the editor.
                  at: path,
                }
              );
              setIsPhotoCaptionOpen(false);
            }}
          >
            <Label sx={{ color: "text" }} htmlFor="caption">
              Caption
            </Label>
            <Textarea
              sx={{
                borderColor: "inputBorderColor",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
              name="caption"
              id="caption"
              rows={6}
              mb={3}
              defaultValue={element.photoCaption}
            ></Textarea>

            <Button sx={{ backgroundColor: "primary" }}>Save</Button>
          </form>
        </Box>
      </StandardModal>
    </>
  );
};

export default PhotoCaptionModal;
