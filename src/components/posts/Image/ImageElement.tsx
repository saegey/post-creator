import {
  useSlateStatic,
  ReactEditor,
  useSelected,
  useFocused,
} from "slate-react";
import { Transforms } from "slate";
import { CldImage } from "next-cloudinary";

import { Box, Button, Label, Textarea, Close, Flex, Text } from "theme-ui";
import React from "react";
import { PostSaveComponents } from "../../../actions/PostSave";
import { PostContext } from "../../PostContext";
import Dropdown from "../../shared/Dropdown";
import OptionsButton from "../../buttons/OptionsButton";
import { useClickOutside } from "../../../utils/ux";
import { cloudUrl } from "../../../utils/cloudinary";
import { ImageElementType } from "../../../types/common";

type SlateImageType = {
  type: "image";
  src: string;
  asset_id: string;
  public_id: string;
  children: Array<{ text: string }>;
  void: true;
  caption?: string;
};

const ImageElement = ({
  children,
  element,
}: {
  children: JSX.Element;
  element: ImageElementType;
}) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [addCaption, setAddCaption] = React.useState(false);

  const { id, title, postLocation, images } = React.useContext(PostContext);
  const selected = useSelected();
  const focused = useFocused();

  const imageMeta = images?.find((i) => i.public_id === element.public_id);

  const wrapperRef = React.useRef();

  useClickOutside(
    wrapperRef,
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setIsMenuOpen(false);
      e.stopPropagation();
    }
  );

  const saveCaption = async (event: any) => {
    event.preventDefault();
    const form = new FormData(event.target);

    setAddCaption(false);
    Transforms.setNodes(
      editor,
      {
        caption: form.get("caption"),
      } as SlateImageType,
      { at: [path as any] }
    );

    await PostSaveComponents({
      postId: id,
      title: title,
      postLocation: postLocation,
      components: editor.children,
    });
  };

  return (
    <Box contentEditable={false}>
      <Box
        sx={{
          position: "relative",
          width: ["100%", "900px", "900px"],
          maxWidth: "900px",
          marginX: "auto",
          marginY: ["20px", "60px", "60px"],
          height: "600px",
          marginBottom: "20px",
        }}
      >
        <Flex
          sx={{
            width: "100%",
            height: "600px",
            backgroundColor: imageMeta?.colors[0],
            borderRadius: [0, "5px", "5px"],
          }}
        >
          <CldImage
            width="1200"
            height="1200"
            src={element.public_id}
            sizes="100vw"
            alt="race pic"
            quality={90}
            style={{
              objectFit: "contain",
              width: "100%",
              maxHeight: "100%",
              borderRadius:
                imageMeta &&
                imageMeta.width &&
                imageMeta.height &&
                imageMeta?.width > imageMeta?.height
                  ? "5px"
                  : "0px",
              boxShadow: `${
                selected && focused ? "0 0 0 3px #B4D5FF" : "none"
              }`,
            }}
            config={{
              cloud: {
                cloudName: cloudUrl,
              },
            }}
          />
        </Flex>
        {element.caption && <Text as="p">{element.caption}</Text>}

        {addCaption && (
          <>
            <Box
              sx={{
                position: "absolute",
                right: "0px",
                top: "0px",
                height: "100%",
                background: "editorBackground",
                width: "100%",
                borderRadius: "5px",
              }}
            >
              <Flex>
                <Box
                  sx={{
                    marginLeft: "auto",
                    marginRight: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Close
                    sx={{ zIndex: "10" }}
                    onClick={() => setAddCaption(false)}
                  />
                </Box>
              </Flex>
              <Box
                sx={{
                  width: "80%",
                  marginY: "auto",
                  marginX: "auto",
                  height: "80%",
                }}
              >
                <form onSubmit={saveCaption}>
                  <Label sx={{ color: "text" }} htmlFor="caption">
                    Caption
                  </Label>
                  <Textarea
                    sx={{ background: "inputBackgroundColor" }}
                    name="caption"
                    id="caption"
                    rows={6}
                    mb={3}
                  >
                    {element.caption}
                  </Textarea>

                  <Button variant="primaryButton">Save</Button>
                </form>
              </Box>
            </Box>
          </>
        )}
        {!addCaption && (
          <Box
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
            }}
            ref={wrapperRef}
          >
            <OptionsButton
              onClick={() => {
                if (isMenuOpen) {
                  setIsMenuOpen(false);
                } else {
                  setIsMenuOpen(true);
                }
              }}
            />
            <Dropdown isOpen={isMenuOpen}>
              <Flex sx={{ gap: "10px", flexDirection: "column" }}>
                <Box
                  onClick={() => {
                    setAddCaption(true);
                    setIsMenuOpen(false);
                  }}
                  variant="boxes.dropdownMenuItem"
                >
                  {element.caption ? "Edit" : "Add"} Caption
                </Box>
                <Box
                  onClick={(e) => {
                    Transforms.removeNodes(editor, { at: path });
                    setIsMenuOpen(false);
                  }}
                  variant="boxes.dropdownMenuItem"
                >
                  Delete
                </Box>
              </Flex>
            </Dropdown>
          </Box>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default ImageElement;
