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

  const saveCaption = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);

    setAddCaption(false);
    Transforms.setNodes<ImageElementType>(
      editor,
      {
        caption: String(form.get("caption")) ?? "",
      },
      { at: path }
    );

    await PostSaveComponents({
      postId: id,
      components: editor.children,
    });
  };

  return (
    <>
      {element.caption && (
        <Text as="figcaption" sx={{ fontSize: "14px", marginTop: "5px" }}>
          {element.caption}
        </Text>
      )}
      {addCaption && (
        <StandardModal
          title={"Add Caption"}
          setIsOpen={() => setAddCaption(false)}
          isOpen={addCaption}
          onClose={() => setAddCaption(false)}
        >
          <Flex sx={{ gap: "10px", flexDirection: "row", marginTop: "15px" }}>
            <form onSubmit={saveCaption} style={{ flexGrow: 1 }}>
              <Flex sx={{ gap: "20px", flexDirection: "column" }}>
                <Label sx={{ color: "text" }} htmlFor="caption">
                  Caption
                </Label>
                <Textarea
                  sx={{ background: "surface" }}
                  name="caption"
                  id="caption"
                  rows={6}
                  mb={3}
                >
                  {element.caption}
                </Textarea>
                <Flex>
                  <Button
                    variant="primaryButton"
                    sx={{ alignSelf: "flex-end" }}
                  >
                    Save
                  </Button>
                </Flex>
              </Flex>
            </form>
          </Flex>
        </StandardModal>
      )}
    </>
  );
};

export default ImageCaption;
