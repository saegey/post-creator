import React from "react";
import { Label, Textarea, Button, Flex } from "theme-ui";
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
        <Flex
          sx={{
            width: "100%",
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
            <Label sx={{ color: "text", marginY: "10px" }} htmlFor="caption">
              Caption
            </Label>
            <Textarea
              sx={{
                borderColor: "border",
                borderWidth: "1px",
                borderStyle: "solid",
                width: "100%",
              }}
              name="caption"
              id="caption"
              rows={6}
              mb={3}
              value={"sfdf"}
              // defaultValue={element.photoCaption}
            ></Textarea>

            <Button>Save</Button>
          </form>
        </Flex>
      </StandardModal>
    </>
  );
};

export default PhotoCaptionModal;
