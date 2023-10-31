import React from "react";
import { Box, Text } from "theme-ui";
import { RenderLeafProps } from "slate-react";

import PowerGraphElement from "../PowerGraph/PowerGraphElement";
import ImageElement from "../Image/ImageElement";
import VisualOverviewWrapper from "../VisualOverview/VisualOverviewWrapper";
import ActivityOverviewWrapper from "../ActivityOverview/ActivityOverviewWrapper";
import TimePowerZonesWrapper from "../TimeInZones/TimePowerZonesWrapper";
import MatchesBurnedWrapper from "../Matches/MatchesBurnedWrapper";
import StravaLink from "../Embed/StravaLink";
import HeroBanner from "../HeroBanner/HeroBanner";
import EmbedElemnt from "../Embed/EmbedElement";
import RaceResultsDotComListWrapper from "../RaceResults/RaceResultsDotComListWrapper";
import Link from "../Text/Link";
import PostAuthorWrapper from "../PostAuthor/PostAuthorWrapper";
import { CustomElement } from "../../../types/common";

const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "" }}
    >
      {props.children}
    </span>
  );
};

// Define a leaf rendering function that is memoized with `useCallback`.
const renderLeaf = (props: RenderLeafProps) => {
  return <Leaf {...props} />;
};

const renderElement = (props: {
  attributes: object;
  children: JSX.Element;
  element: CustomElement;
}) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "postAuthor":
      return <PostAuthorWrapper />;
    case "embed":
      return <EmbedElemnt element={element} />;
    case "stravaEmbed":
      return <StravaLink element={element} />;
    case "powergraph":
      return <PowerGraphElement element={element} />;
    case "timeInZones":
      return <TimePowerZonesWrapper element={element} />;
    case "matchesBurned":
      return <MatchesBurnedWrapper element={element} />;
    case "activityOverview":
      return <ActivityOverviewWrapper element={element} />;
    case "visualOverview":
      return <VisualOverviewWrapper element={element} />;
    case "image":
      return <ImageElement children={children} element={element} />;
    case "heroBanner":
      return <HeroBanner element={element} />;
    case "link":
      return <Link element={element} children={children} />;

    case "heading-two":
      return (
        <Text
          as="h2"
          sx={{
            fontWeight: 700,
            maxWidth: "690px",
            width: ["100%", "690px", "690px"],
            marginLeft: "auto",
            marginRight: "auto",
            paddingX: ["10px", "0px", "0px"],
          }}
        >
          {children}
        </Text>
      );
    case "bulleted-list":
      return (
        <Box
          as="ul"
          sx={{
            paddingY: "40px",
            paddingLeft: ["20px", "20px", "20px"],
            marginX: "auto",
            maxWidth: "690px",
            fontSize: "19px",
            lineHeight: "30px",
            li: {
              paddingX: "5px",
              paddingY: "5px",
            },
          }}
          {...attributes}
        >
          {children}
        </Box>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "raceResultsDotCom":
      return <RaceResultsDotComListWrapper />;
    default:
      return (
        <Text
          as="div"
          sx={{
            marginX: "auto",
            // marginRight: 'auto',
            width: ["100%", "690px", "690px"],
            fontSize: "19px",
            lineHeight: "30px",
            marginY: "20px",
            paddingX: ["10px", "0px", "0px"],
          }}
          {...attributes}
        >
          {children}
        </Text>
      );
  }
};

export default renderElement;
export { renderLeaf };
