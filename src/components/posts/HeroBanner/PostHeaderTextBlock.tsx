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
  headerImageCaption: string | undefined;
  location: string;
  height?: string | null;
}) => {
  return (
    <Box sx={{ width: ["100%", "35%", "35%"] }}>
      <Flex variant="text.postHeaderBackground" contentEditable={false}>
        {type === "" ? null : (
          <Text
            variant="postHeaderType"
            sx={{
              padding: "2px 10px 2px 10px",
            }}
          >
            {type}
          </Text>
        )}
        <Text
          as="h1"
          // variant="postTitle"
          sx={{
            color: title === "Title" || title === "" ? "muted" : "text",
            lineHeight: "45px",
          }}
        >
          {title}
        </Text>

        <Text
          as="p"
          sx={{
            color: teaser === "Subhead" ? "muted" : "text",
            fontWeight: "500",
            fontSize: "16px",
            lineHeight: "22px",
          }}
        >
          {teaser}
        </Text>
        <Text sx={{ fontSize: "15px", fontWeight: "400" }}>
          <Text sx={{ color: date === "Event date" ? "muted" : "text" }}>
            {date}
          </Text>{" "}
          —{" "}
          <Text sx={{ color: location === "Location" ? "muted" : "text" }}>
            {location}
          </Text>
        </Text>
        <Text
          sx={{
            color:
              headerImageCaption === undefined || headerImageCaption === ""
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
