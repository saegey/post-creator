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
import {Box} from 'theme-ui';

const SlatePublish = () => {
  const config: SlateToReactConfig = {
    ...slateToReactConfig,
    react: {
      elementTransforms: {
        ...slateToReactConfig.react.elementTransforms,
        powergraph: () => {
          return <PowerGraphViewWrapper key={`pow-${Math.random()}`} />;
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
          return <StravaLink element={node} key={`embed-${Math.random()}`} />;
        },
        visualOverview: ({ node }) => {
          // return <Box key={`viz-${Math.random()}`}></Box>;
          return (
            <VisualOverviewViewWrapper
              element={node}
              view={true}
              key={`viz-${Math.random()}`}
            />
          );
        },
        timeInZones: () => {
          return (
            <TimeInZonesViewWrapper key={`timeInZones-${Math.random()}`} />
          );
        },
        heroBanner: ({ node }: { node?: HeroBannerType }) => {
          return (
            <HeroBannerViewWrapper node={node} key={`hero-${Math.random()}`} />
          );
        },
        activityOverview: () => {
          return (
            <ActivityOverviewViewWrapper key={`activity-${Math.random()}`} />
          );
        },
        "bulleted-list": ({ node }: { node?: BulletedListType }) => {
          return (
            <BullettedListViewWrapper
              node={node}
              key={`bullet-${Math.random()}`}
            />
          );
        },
        paragraph: ({ node }: { node?: ParagraphElement }) => {
          return (
            <ParagraphViewWrapper
              node={node}
              key={`paragraph-${Math.random()}`}
            />
          );
        },
        text: ({ node }: { node?: ParagraphElement }) => {
          // console.log("teext", node);
          return (
            <ParagraphViewWrapper node={node} key={`text-${Math.random()}`} />
          );
        },
        "heading-two": ({ node }: { node?: HeadingElement }) => {
          return (
            <HeadingViewWrapper node={node} key={`head-${Math.random()}`} />
          );
        },
        raceResultsDotCom: () => {
          return (
            <RaceResultsDotComViewWrapper key={`racerez-${Math.random()}`} />
          );
        },
        postAuthor: () => {
          return (
            <PostAuthor key={"postauthor"} key={`postauth-${Math.random()}`} />
          );
        },
        image: ({ node }) => {
          return (
            <ImageViewWrapper node={node} key={`image-${Math.random()}`} />
          );
        },
        // 'list-item': ({ node }) => {
        //   console.log("blah");
        //   return <></>;
        // },
      },
    },
  };
  return config;
};

export default SlatePublish;
