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
import { cloudUrl } from "../../../utils/cloudinary";
import { ImageElementType } from "../../../types/common";
import MaximizeIcon from "../../icons/MaximizeIcon";
import ImageFullScreen from "./ImageFullScreen";
import OptionsMenu from "../Editor/OptionsMenu";
import HoverAction from "../Editor/HoverAction";

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

  const { id, title, postLocation, images } = React.useContext(PostContext);
  const selected = useSelected();
  const focused = useFocused();

  const imageMetaIndex: number | undefined = images?.findIndex(
    (i) => i.public_id === element.public_id
  );
  if (imageMetaIndex === undefined) {
    return;
  }
  const imageMeta = images ? images[imageMetaIndex] : undefined;

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
    <HoverAction>
      <Box contentEditable={false}>
        {isMaximized && imageMeta && (
          <ImageFullScreen
            setIsMaximized={setIsMaximized}
            width={imageMeta.width}
            height={imageMeta.height}
            index={imageMetaIndex}
            public_id={imageMeta.public_id}
          />
        )}
        <Box
          sx={{
            position: "relative",
            // width: ["100%", "900px", "900px"],
            // maxWidth: "900px",
            marginX: "auto",
            marginY: ["20px", "60px", "60px"],
            height: "fit-content",
            marginBottom: "20px",
          }}
        >
          <figure>
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
                paddingX: ["10px", 0, 0],
              }}
            >
              {element.caption}
            </Text>
          )}

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
            <OptionsMenu>
              <>
                <Box
                  onClick={() => {
                    setAddCaption(true);
                  }}
                  variant="boxes.dropdownMenuItem"
                >
                  {element.caption ? "Edit" : "Add"} Caption
                </Box>
                <Box
                  onClick={(e) => {
                    Transforms.removeNodes(editor, { at: path });
                  }}
                  variant="boxes.dropdownMenuItem"
                >
                  Delete
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
