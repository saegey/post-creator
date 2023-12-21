import React from "react";
import {
  slateToReactConfig,
  type SlateToReactConfig,
} from "@slate-serializers/react";
import { Box, Flex, Text } from "theme-ui";
import MuxPlayer from "@mux/mux-player-react";

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
import RaceResultsDotComViewWrapper from "../RaceResults/RaceResults/RaceResultsDotComViewWrapper";
import ImageViewWrapper from "../Image/ImageViewWrapper";
import WebscorerViewWrapper from "../RaceResults/WebScorer/WebscorerViewWrapper";

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
        webscorerResults: () => {
          return <WebscorerViewWrapper key={`racerez-${Math.random()}`} />;
        },
        postAuthor: () => {
          return <PostAuthor key={`postauth-${Math.random()}`} />;
        },
        image: ({ node }) => {
          return (
            <ImageViewWrapper node={node} key={`image-${Math.random()}`} />
          );
        },
        videoEmbed: ({ node }) => {
          return (
            <Flex sx={{ width: "100%", justifyContent: "center" }}>
              <Box sx={{ width: "600px", height: "auto" }}>
                <MuxPlayer
                  playbackId={node.playbackId}
                  metadata={{
                    video_id: "video-id-123456",
                    video_title: "Bick Buck Bunny",
                    viewer_user_id: "user-id-bc-789",
                  }}
                  streamType="on-demand"
                />
              </Box>
            </Flex>
          );
        },
      },
    },
  };
  return config;
};

export default SlatePublish;
