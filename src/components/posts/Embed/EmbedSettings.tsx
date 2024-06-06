import { Flex, Box, Label, Input, Button, Text } from "theme-ui";
import { Transforms, Element as SlateElement, Path } from "slate";
import React from "react";

import { CustomEditor } from "../../../types/common";
import { EditorContext } from "../Editor/EditorContext";

const EmbedSettings = ({
  editor,
  isModalOpen,
  path,
}: {
  editor: CustomEditor;
  isModalOpen: (arg0: boolean) => void;
  path: Path;
}) => {
  const { mobileMenu, setMobileMenu, setIsNewComponentMenuOpen } =
    React.useContext(EditorContext);

  return (
    <Flex sx={{ gap: "10px", flexDirection: "row", marginTop: "15px" }}>
      <form
        onSubmit={(event: any) => {
          event.preventDefault();
          const form = new FormData(event.target);
          const el = document.createElement("html");
          el.innerHTML = form.get("url") as string;

          const iframe = el.querySelector("iframe");
          if (!iframe) {
            return;
          }
          const url = new URL(iframe.src);
          const finalUrl = `https://ridewithgps.com/embeds?${url.search}`;
          Transforms.insertNodes(
            editor,
            {
              type: "embed",
              void: true,
              url: finalUrl,
              children: [{ text: "" }],
            }
            // { at: path }
          );
          if (path.length > 2) {
            Transforms.liftNodes(editor);
          }
          isModalOpen(false);
          setIsNewComponentMenuOpen(false);
          setMobileMenu({
            top: 0,
            left: 0,
            display: false,
            path: path,
            isFullScreen: false,
          });
          const selection = window.getSelection();
          // console.log(selection)
          selection && selection.removeAllRanges();

        }}
        style={{ width: "100%" }}
      >
        <Flex sx={{ gap: "20px", flexDirection: "column" }}>
          <Box>
            <Label htmlFor="url" variant="defaultLabel">
              Embed Code
            </Label>
            <Input id="url" name="url" variant={"defaultInput"} />
          </Box>
          <Box sx={{ marginLeft: "auto" }}>
            <Button variant="primaryButton">
              <Flex sx={{ gap: "10px" }}>
                <Text as="span">Save</Text>
              </Flex>
            </Button>
          </Box>
        </Flex>
      </form>
    </Flex>
  );
};

export default EmbedSettings;
