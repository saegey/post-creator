import React from "react";
import {
  slateToReactConfig,
  type SlateToReactConfig,
} from "@slate-serializers/react";

import EmbedElemnt from "./EmbedElement";
import PostAuthor from "./PostAuthor";
import { PostContext } from "./PostContext";
import StravaLink from "./StravaLink";
import {
  BulletedListType,
  HeadingElement,
  HeroBannerType,
  ParagraphElement,
} from "../types/common";
import ActivityOverviewViewWrapper from "./ActivityOverviewViewWrapper";
import VisualOverviewViewWrapper from "./VisualOverviewViewWrapper";
import PowerGraphViewWrapper from "./PowerGraphViewWrapper";
import HeroBannerViewWrapper from "./HeroBannerViewWrapper";
import TimeInZonesViewWrapper from "./TimeInZonesViewWrapper";
import BullettedListViewWrapper from "./BulletedListViewWrapper";
import ParagraphViewWrapper from "./ParagraphViewWrapper";
import HeadingViewWrapper from "./HeadingViewWrapper";
import RaceResultsDotComViewWrapper from "./RaceResultsDotComViewWrapper";
import ImageViewWrapper from "./ImageViewWrapper";

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
        visualOverview: () => {
          return <VisualOverviewViewWrapper />;
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
