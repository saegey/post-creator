import { Box, Text, Grid, ThemeUIStyleObject, Theme } from "theme-ui";
import React from "react";

import { ActivityItems } from "./types";

const ActivityOverviewTemplate = ({ items }: { items: ActivityItems }) => (
  <Grid
    gap={2}
    columns={[2, 2, 3]}
    sx={
      {
        borderRadius: "4px",
        gap: ["10px", "5px 100px", "5px"],
      } as ThemeUIStyleObject<Theme>
    }
  >
    {items.map((item, index) => (
      <Box key={`box-${index}`}>
        <Text
          sx={
            {
              fontWeight: "500",
              textTransform: "uppercase",
              fontSize: ["12px", "13px", "13px"],
              color: "text",
              marginBottom: "3px",
            } as ThemeUIStyleObject<Theme>
          }
          as="div"
        >
          {item.title}
        </Text>
        <Text
          as="div"
          sx={
            {
              // fontFamily: "body",
              fontSize: ["20px", "24px", "24px"],
              lineHeight: ["20px", "24px", "24px"],
              fontWeight: ["600", "600", "600"],
              marginBottom: "10px",
            } as ThemeUIStyleObject<Theme>
          }
        >
          {item.value}
        </Text>
      </Box>
    ))}
  </Grid>
);

export default ActivityOverviewTemplate;
