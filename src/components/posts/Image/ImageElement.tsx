import {
  useSlateStatic,
  ReactEditor,
  useSelected,
  useFocused,
} from "slate-react";
import { Transforms } from "slate";
import { Box, Button, Label, Textarea, Close, Flex, Text } from "theme-ui";
import React from "react";
import { getCldImageUrl } from "next-cloudinary";
import Image from "next/image";

import { PostSaveComponents } from "../../../actions/PostSave";
import { PostContext } from "../../PostContext";
import { cloudUrl } from "../../../utils/cloudinary";
import { ImageElementType } from "../../../types/common";
import MaximizeIcon from "../../icons/MaximizeIcon";
import ImageFullScreen from "./ImageFullScreen";
import OptionsMenu from "../Editor/OptionsMenu";
import HoverAction from "../Editor/HoverAction";
import StandardModal from "../../shared/StandardModal";

import { useViewport } from "../../ViewportProvider";

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

  const [addCaption, setAddCaption] = React.useState(false);
  const [isMaximized, setIsMaximized] = React.useState(false);
  const { width } = useViewport();
  const { id, title, postLocation, images } = React.useContext(PostContext);
  const imageMetaIndex: number | undefined = images?.findIndex(
    (i) => i.public_id === element.public_id
  );
  if (imageMetaIndex === undefined) {
    return;
  }
  const imageMeta = images ? images[imageMetaIndex] : undefined;
  const imageWidth = width < 690 ? width : 690;
  if (!imageMeta?.height || !imageMeta.width) {
    return <></>;
  }

  const imageUrl = getCldImageUrl(
    {
      src: element.public_id,
      width: width < 690 ? width : 690,
      height: imageMeta?.height / (imageMeta?.width / imageWidth),
    },
    {
      cloud: {
        cloudName: cloudUrl,
      },
    }
  );

  const selected = useSelected();
  const focused = useFocused();

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
      components: editor.children,
    });
  };

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
          sx={{
            marginY: ["20px", "20px", "20px"],
            height: "fit-content",
            marginBottom: "20px",
          }}
        >
          <figure>
            <Flex
              sx={{
                width: "100%",
                height: "auto",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: imageMeta?.colors
                  ? imageMeta?.colors[0]
                  : "white",
                borderRadius: [0, "5px", "5px"],
              }}
            >
              <Image
                src={imageUrl}
                alt="Uploaded"
                width={600}
                height={500}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  boxShadow: `${
                    selected && focused ? "0 0 0 3px #B4D5FF" : "none"
                  }`,
                }}
                priority={true}
              />
            </Flex>
            <Box
              sx={{
                position: "absolute",
                left: "10px",
                top: "10px",
              }}
            >
              <Box
                sx={{ width: "30px", height: "auto", cursor: "pointer" }}
                onClick={() => {
                  setIsMaximized(true);
                }}
              >
                <MaximizeIcon />
              </Box>
            </Box>
          </figure>
          {element.caption && (
            <Text
              as="figcaption"
              sx={{
                fontSize: "14px",
                marginTop: "5px",
                paddingX: [0, 0, 0],
              }}
            >
              {element.caption}
            </Text>
          )}

          {addCaption && (
            <>
              <StandardModal
                title={"Add Caption"}
                setIsOpen={() => setAddCaption(false)}
                isOpen={addCaption}
              >
                <Flex
                  sx={{
                    gap: "10px",
                    flexDirection: "row",
                    marginTop: "15px",
                  }}
                >
                  <form onSubmit={saveCaption} style={{ flexGrow: 1 }}>
                    <Flex sx={{ gap: "20px", flexDirection: "column" }}>
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
            </>
          )}

          {!addCaption && (
            <OptionsMenu>
              <>
                <Box
                  onClick={() => {
                    setAddCaption(true);
                  }}
                  variant="boxes.dropdownMenuItem"
                >
                  <Text sx={{ fontSize: ["14px", "16px", "16px"] }}>
                    {element.caption ? "Edit" : "Add"} Caption
                  </Text>
                </Box>
                <Box
                  onClick={(e) => {
                    Transforms.removeNodes(editor, { at: path });
                    const selection = window.getSelection();
                    selection && selection.removeAllRanges();
                  }}
                  variant="boxes.dropdownMenuItem"
                >
                  <Text sx={{ fontSize: ["14px", "16px", "16px"] }}>
                    Delete
                  </Text>
                </Box>
              </>
            </OptionsMenu>
          )}
        </Box>
        {children}
      </Box>
    </HoverAction>
  );
};

export default ImageElement;
