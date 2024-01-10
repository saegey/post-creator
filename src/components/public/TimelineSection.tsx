import React from "react";
import { Box, Flex, Grid, Link as ThemeLink, Text } from "theme-ui";

const TimelineSection = ({
  year,
  items,
}: {
  year: number;
  items: Array<React.JSX.Element | string>;
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "704px",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        display: "flex",
      }}
    >
      <Box sx={{ width: ["15%", "10%", "10%"] }}>
        <Text
          as="div"
          sx={{
            color: "white",
            marginBottom: "30px",
            paddingTop: "16px",
            fontSize: "16px",
            lineHeight: "28px",
          }}
        >
          {year}
        </Text>
      </Box>
      <Flex sx={{ width: "5%", justifyContent: "center" }}>
        <Box
          sx={{
            width: "1px",
            height: "100%",
            backgroundColor: "#e7e8eb",
          }}
        ></Box>
      </Flex>
      <Box sx={{ width: ["80%", "85%", "85%"], paddingBottom: "56px" }}>
        {items.map((item, index) => (
          <Flex key={`timeline-section-${index}`}>
            <Box
              sx={{
                width: "24px",
                height: "1px",
                backgroundColor: "#e7e8eb",
                marginTop: "14px",
                marginRight: "20px",
              }}
            ></Box>
            <Text
              as="div"
              sx={{
                color: "white",
                fontSize: "16px",
                lineHeight: "28px",
                fontWeight: 300,
                flex: 1,
                marginBottom: "30px",
              }}
            >
              {item}
            </Text>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default TimelineSection;
