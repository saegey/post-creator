import React from "react";

import {
  BulletedListType,
  CustomElement,
  HeadingElement,
  ParagraphElement as ParagraphElementType,
} from "../../../types/common";
import { useUnits } from "../../UnitProvider";
import PowerGraphElement from "../PowerGraph/PowerGraphElement";
import ImageElement from "../Image/ImageElement";
import VisualOverviewWrapper from "../VisualOverview/VisualOverviewWrapper";
import ActivityOverviewWrapper from "../ActivityOverview/ActivityOverviewWrapper";
import TimePowerZonesWrapper from "../TimeInZones/TimePowerZonesWrapper";
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
import ParagraphElement from "../../ParagraphElement";
import BulletList from "./BulletList/BulletList";
import Heading from "./Heading";

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
    case "activityOverview":
      return <ActivityOverviewWrapper element={element} />;
    case "visualOverview":
      return (
        <VisualOverviewWrapper
          element={element}
          view={false}
          unitOfMeasure={units.unitOfMeasure}
        />
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
        <Heading
          children={props.children}
          element={props.element as HeadingElement}
        />
      );
    case "bulleted-list":
      return (
        <BulletList
          children={props.children}
          element={props.element as BulletedListType}
          attributes={props.attributes}
        />
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "raceResultsDotCom":
      return <RaceResultsDotComListWrapper {...props} />;
    case "webscorerResults":
      return <WebscorerListWrapper {...props} />;
    case "crossResults":
      return <CrossResultstListWrapper />;
    case "omniResults":
      return <OmniResultsListWrapper />;
    case "runSignupResults":
      return <RunSignupListWrapper />;
    case "paragraph":
      return (
        <ParagraphElement
          children={props.children}
          element={props.element as ParagraphElementType}
        />
      );
    default:
      return (
        <ParagraphElement
          children={props.children}
          element={props.element as ParagraphElementType}
        />
      );
  }
};

export default renderElement;
