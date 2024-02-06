import { Flex, Box, Label, Input, Button, Text } from "theme-ui";
import { Transforms, Element as SlateElement } from "slate";
import React from "react";

import { CustomEditor } from "../../../types/common";
import { EditorContext } from "../Editor/EditorContext";

const EmbedSettings = ({
  editor,
  isModalOpen,
}: {
  editor: CustomEditor;
  isModalOpen: (arg0: boolean) => void;
}) => {
  const { menuPosition } = React.useContext(EditorContext);

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
            },
            { at: menuPosition.path }
          );
          isModalOpen(false);
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
