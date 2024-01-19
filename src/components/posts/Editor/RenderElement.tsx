import React from "react";
import { Box, Flex, IconButton, Text } from "theme-ui";
import { ReactEditor, RenderLeafProps, useSlateStatic } from "slate-react";

import { CustomElement } from "../../../types/common";
import { useUnits } from "../../UnitProvider";
import PowerGraphElement from "../PowerGraph/PowerGraphElement";
import ImageElement from "../Image/ImageElement";
import VisualOverviewWrapper from "../VisualOverview/VisualOverviewWrapper";
import ActivityOverviewWrapper from "../ActivityOverview/ActivityOverviewWrapper";
import TimePowerZonesWrapper from "../TimeInZones/TimePowerZonesWrapper";
import MatchesBurnedWrapper from "../Matches/MatchesBurnedWrapper";
import StravaLink from "../Embed/StravaLink";
import HeroBanner from "../HeroBanner/HeroBanner";
import EmbedElemnt from "../Embed/EmbedElement";
import Link from "../Text/Link";
import PostAuthorWrapper from "../PostAuthor/PostAuthorWrapper";

import VideoPlayer from "../VideoEmbed/VideoPlayer";

import CrossResultstListWrapper from "../RaceResults/CrossResults/CrossResultsListWrapper";
import OmniResultsListWrapper from "../RaceResults/OmniGo/OmniResultsListWrapper";
import WebscorerListWrapper from "../RaceResults/WebScorer/WebscorerListWrapper";
import RaceResultsDotComListWrapper from "../RaceResults/RaceResults/RaceResultsDotComListWrapper";
import RunSignupListWrapper from "../RaceResults/RunSignup/RunSignupListWrapper";
import ComponentMenu from "./ComponentMenu";
import { extend } from "cypress/types/lodash";
import { EditorContext } from "./EditorContext";
import { Editor, Node, Transforms } from "slate";
import ParagraphElement from "../../ParagraphElement";

const renderElement = (props: {
  attributes: object;
  children: JSX.Element;
  element: CustomElement;
}) => {
  const { attributes, children, element } = props;
  const units = useUnits();

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
      return (
        <VisualOverviewWrapper element={element} view={false} units={units} />
      );
    case "image":
      return <ImageElement children={children} element={element} />;
    case "heroBanner":
      return <HeroBanner element={element} />;
    case "link":
      return <Link element={element} children={children} />;
    case "videoEmbed":
      return <VideoPlayer element={element} />;
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
            lineHeight: "30px",
            paddingTop: ["0px", "0px", "0px"],
            paddingBottom: ["0px", "20px", "20px"],
            paddingLeft: ["40px", "25px", "28px"],
            paddingRight: ["20px", "20px", "20px"],
            borderLeftColor: "postBorderLeft",
            borderLeftStyle: "solid",
            borderLeftWidth: ["0px", "1px", "1px"],
            marginX: "auto",
            marginTop: "10px",
            maxWidth: "690px",
            fontSize: "19px",
            li: {
              paddingRight: "5px",
              paddingLeft: "15px",
              marginBottom: "10px",
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
    case "webscorerResults":
      return <WebscorerListWrapper />;
    case "crossResults":
      return <CrossResultstListWrapper />;
    case "omniResults":
      return <OmniResultsListWrapper />;
    case "runSignupResults":
      return <RunSignupListWrapper />;
    case "paragraph":
      return <ParagraphElement {...props} />;
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
          {/* text coomp */}
          {children}
        </Text>
      );
  }
};

export default renderElement;
