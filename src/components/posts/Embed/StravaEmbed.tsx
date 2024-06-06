import { Flex, Box, Label, Input, Button, Text } from "theme-ui";
import { Transforms, Element as SlateElement, Path } from "slate";
import React from "react";

import { CustomEditor } from "../../../types/common";
import { EditorContext } from "../Editor/EditorContext";

interface StravaEmbedProps {
  editor: CustomEditor;
  isModalOpen: (arg: boolean) => void;
  path: Path;
}
const StravaEmbed = ({ editor, isModalOpen, path }: StravaEmbedProps) => {
  return (
    <Flex sx={{ gap: "10px", flexDirection: "row", marginTop: "15px" }}>
      <form
        onSubmit={(event: any) => {
          event.preventDefault();
          const form = new FormData(event.target);
          const inputUrl = form.get("url") as string;
          const url = new URL(inputUrl);
          const activityId = JSON.stringify(url.pathname.match(/(\d+)/));

          Transforms.insertNodes(
            editor,
            {
              type: "stravaEmbed",
              void: true,
              activityId: JSON.parse(activityId)[0],
              children: [{ text: "" }],
            },
            { at: path }
          );

          isModalOpen(false);
        }}
        style={{ width: "100%" }}
      >
        <Flex sx={{ gap: "20px", flexDirection: "column" }}>
          <Box>
            <Label htmlFor="url" variant="defaultLabel">
              Link to Strava activity
            </Label>
            <Input
              id="url"
              name="url"
              placeholder="https://www.strava.com/activities/xxxxxxxxx"
              variant={"defaultInput"}
            />
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

export default StravaEmbed;
