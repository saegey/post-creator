import { Flex, Text, Box } from "theme-ui";
import React from "react";

import { EditorContext } from "../Editor/EditorContext";

const PostHeaderTextBlock = ({
  type = "Race",
  title = "Title",
  teaser = "Subhead",
  date,
  headerImageCaption,
  location,
  height = null,
}: {
  type: string;
  title: string;
  teaser: string;
  date: string;
  headerImageCaption: string;
  location: string;
  height?: string | null;
}) => {
  const { setIsSettingsModalOpen } = React.useContext(EditorContext);

  return (
    <Box sx={{ width: ["100%", "35%", "35%"] }}>
      <Flex
        variant="text.postHeaderBackground"
        onClick={() => setIsSettingsModalOpen(true)}
        contentEditable={false}
      >
        <Text
          variant="postHeaderType"
          sx={{
            padding: "2px 10px 2px 10px",
          }}
        >
          {type}
        </Text>
        <Text
          as="h1"
          variant="postTitle"
          sx={{
            color: title === "Title" ? "textMuted" : "text",
            lineHeight: "38px",
          }}
        >
          {title}
        </Text>

        <Text
          as="p"
          sx={{
            color: teaser === "Subhead" ? "textMuted" : "text",
            fontWeight: "500",
            fontSize: "16px",
            lineHeight: "22px",
          }}
        >
          {teaser}
        </Text>
        <Text sx={{ fontSize: "15px", fontWeight: "400" }}>
          <Text sx={{ color: date === "Event date" ? "textMuted" : "text" }}>
            {date}
          </Text>{" "}
          —{" "}
          <Text sx={{ color: location === "Location" ? "textMuted" : "text" }}>
            {location}
          </Text>
        </Text>
        <Text
          sx={{
            color:
              headerImageCaption === "Enter caption here"
                ? "textMuted"
                : "text",
            marginTop: "auto",
            fontSize: "12px",
            lineHeight: "15px",
            fontWeight: "500",
            order: [-1, 0, 0],
            marginBottom: ["10px", "0", "0"],
          }}
        >
          {headerImageCaption}
        </Text>
      </Flex>
    </Box>
  );
};

export default PostHeaderTextBlock;
