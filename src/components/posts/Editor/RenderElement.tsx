import React from "react";

import {
  ActivityOverviewType,
  BulletedListType,
  CustomElement,
  HeadingElement,
  ParagraphElement as ParagraphElementType,
} from "../../../types/common";
import { useUnits } from "../../UnitProvider";
import PowerGraphElement from "../PowerGraph/PowerGraphElement";
import ImageWrapper from "../Image/ImageWrapper";
import VisualOverviewWrapper from "../VisualOverview/VisualOverviewWrapper";
import ActivityOverviewWrapper from "../ActivityOverview/ActivityOverviewWrapper";
import HeroBanner from "../HeroBanner/HeroBanner";
import EmbedElement from "../Embed/EmbedElement";
import Link from "../Text/Link";
import PostAuthorWrapper from "../PostAuthor/PostAuthorWrapper";
import VideoPlayer from "../VideoEmbed/VideoPlayer";

import CrossResultstListWrapper from "../RaceResults/CrossResults/CrossResultsListWrapper";
import OmniResultsListWrapper from "../RaceResults/OmniGo/OmniResultsListWrapper";
import WebscorerListWrapper from "../RaceResults/WebScorer/WebscorerListWrapper";
import RaceResultsDotComListWrapper from "../RaceResults/RaceResults/RaceResultsDotComListWrapper";
import RunSignupListWrapper from "../RaceResults/RunSignup/RunSignupListWrapper";

import ParagraphElement from "../Text/ParagraphElement";
import BulletList from "./BulletList/BulletList";
import Heading from "../Text/Heading";

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

    case "embed": // Ridewithgps *
      return <EmbedElement element={element} />;

    case "powergraph": // Power curve graph *
      return <PowerGraphElement element={element} />;

    case "activityOverview": // activity metrics *
      return <ActivityOverviewWrapper element={element} children={children} />;

    case "visualOverview": // map and elevation graph *
      return (
        <VisualOverviewWrapper
          element={element}
          view={false}
          unitOfMeasure={units.unitOfMeasure}
        />
      );

    case "image": // Image *
      return <ImageWrapper element={element} />;

    case "heroBanner": // Hero banner *
      return <HeroBanner element={element} />;

    case "link": // Link *
      return <Link element={element} children={children} />;

    case "videoEmbed": // Video *
      return <VideoPlayer element={element} />;

    case "heading": // Heading *
      return (
        <Heading
          children={props.children}
          element={props.element as HeadingElement}
        />
      );

    case "bulletedList": // Bulleted list *
      return (
        <BulletList
          children={props.children}
          element={props.element as BulletedListType}
          attributes={props.attributes}
        />
      );

    case "list-item": // List item *
      return <li {...attributes}>{children}</li>;

    case "raceResults": // raceresults *
      if (element.subType === "raceResultsDotCom") {
        return <RaceResultsDotComListWrapper {...props} />;
      }
      if (element.subType === "webscorerResults") {
        return <WebscorerListWrapper {...props} />;
      }
      if (element.subType === "crossResults") {
        return <CrossResultstListWrapper element={props.element} />;
      }
      if (element.subType === "omniResults") {
        return <OmniResultsListWrapper element={props.element} />;
      }
      if (element.subType === "runSignupResults") {
        return <RunSignupListWrapper element={props.element} />;
      }

    case "paragraph": // Paragraph *
      return (
        <ParagraphElement
          children={props.children}
          element={props.element as ParagraphElementType}
        />
      );
    default:
      return <></>;
  }
};

export default renderElement;
