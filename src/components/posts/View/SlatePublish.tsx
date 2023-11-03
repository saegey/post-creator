import React from "react";
import {
  slateToReactConfig,
  type SlateToReactConfig,
} from "@slate-serializers/react";

import EmbedElemnt from "../Embed/EmbedElement";
import PostAuthor from "../PostAuthor/PostAuthor";
import { PostContext } from "../../PostContext";
import StravaLink from "../Embed/StravaLink";
import {
  BulletedListType,
  HeadingElement,
  HeroBannerType,
  ParagraphElement,
} from "../../../types/common";
import ActivityOverviewViewWrapper from "../ActivityOverview/ActivityOverviewViewWrapper";
import VisualOverviewViewWrapper from "../VisualOverview/VisualOverviewViewWrapper";
import PowerGraphViewWrapper from "../PowerGraph/PowerGraphViewWrapper";
import HeroBannerViewWrapper from "../HeroBanner/HeroBannerViewWrapper";
import TimeInZonesViewWrapper from "../TimeInZones/TimeInZonesViewWrapper";
import BullettedListViewWrapper from "../Text/BulletedListViewWrapper";
import ParagraphViewWrapper from "../Text/ParagraphViewWrapper";
import HeadingViewWrapper from "../Text/HeadingViewWrapper";
import RaceResultsDotComViewWrapper from "../RaceResults/RaceResultsDotComViewWrapper";
import ImageViewWrapper from "../Image/ImageViewWrapper";

const SlatePublish = () => {
  const config: SlateToReactConfig = {
    ...slateToReactConfig,
    react: {
      elementTransforms: {
        ...slateToReactConfig.react.elementTransforms,
        powergraph: () => {
          return <PowerGraphViewWrapper />;
        },
        embed: ({ node }) => {
          const { id } = React.useContext(PostContext);
          return (
            <div key={`{embed-${id}}`}>
              <EmbedElemnt element={node} />
            </div>
          );
        },
        stravaEmbed: ({ node }) => {
          return <StravaLink element={node} />;
        },
        visualOverview: ({ node }) => {
          return <VisualOverviewViewWrapper element={node} view={true} />;
        },
        timeInZones: () => {
          return <TimeInZonesViewWrapper />;
        },
        heroBanner: ({ node }: { node?: HeroBannerType }) => {
          return <HeroBannerViewWrapper node={node} />;
        },
        activityOverview: () => {
          return <ActivityOverviewViewWrapper />;
        },
        "bulleted-list": ({ node }: { node?: BulletedListType }) => {
          return <BullettedListViewWrapper node={node} />;
        },
        paragraph: ({ node }: { node?: ParagraphElement }) => {
          return <ParagraphViewWrapper node={node} />;
        },
        text: ({ node }: { node?: ParagraphElement }) => {
          return <ParagraphViewWrapper node={node} />;
        },
        "heading-two": ({ node }: { node?: HeadingElement }) => {
          return <HeadingViewWrapper node={node} />;
        },
        raceResultsDotCom: () => {
          return <RaceResultsDotComViewWrapper />;
        },
        postAuthor: () => {
          return <PostAuthor />;
        },
        image: ({ node }) => {
          return <ImageViewWrapper node={node} />;
        },
      },
    },
  };
  return config;
};

export default SlatePublish;
