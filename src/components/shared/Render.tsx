// Renderer.js
import React from "react";
import { Text, Node } from "slate";

import ImageView from "../posts/Image/ImageView";
import ParagraphView from "../posts/Text/ParagraphView";
import HeroBannerView from "../posts/HeroBanner/HeroBannerView";
import ActivityOverviewView from "../posts/ActivityOverview/ActivityOverviewView";
import EmbedView from "../posts/Embed/EmbedView";
import PowerGraphView from "../posts/PowerGraph/PowerGraphView";
import VideoView from "../posts/VideoEmbed/VideoView";
import HeadingView from "../posts/Text/HeadingView";
import BulletList from "../posts/Editor/BulletList/BulletList";
import BulletListView from "../posts/Editor/BulletList/BullletListView";
import VisualOverviewView from "../posts/VisualOverview/VisualOverviewView";
import LinkView from "../posts/Text/LinkView";
import WebscorerListView from "../posts/RaceResults/WebScorer/WebscorerListView";

interface ElementProps {
  attributes: any;
  children: React.ReactNode;
  element: any;
}

const Element: React.FC<ElementProps> = ({ attributes, children, element }) => {
  switch (element.type) {
    case "image":
      return <ImageView element={element} />;

    case "paragraph":
      return <ParagraphView element={element}>{children}</ParagraphView>;

    case "heroBanner":
      return <HeroBannerView element={element} />;

    case "activityOverview":
      return <ActivityOverviewView element={element} />;

    case "embed":
      return <EmbedView element={element} />;

    case "powergraph":
      return <PowerGraphView />;

    case "videoEmbed":
      return <VideoView element={element} />;

    case "heading":
      return <HeadingView {...attributes}>{children}</HeadingView>;

    case "bulletedList":
      return (
        <BulletListView {...attributes} element={element}>
          {children}
        </BulletListView>
      );

    case "list-item": // List item *
      return <li {...attributes}>{children}</li>;

    case "visualOverview":
      return (
        <VisualOverviewView
          element={element}
          view={false}
          unitOfMeasure={"imperial"}
        />
      );

    case "link":
      return <LinkView element={element}>{children}</LinkView>;

    case "raceResults":
      if (element.subType === "webscorerResults") {
        return <WebscorerListView element={element} />;
      }

    default:
      return <div {...attributes}>{children}</div>;
  }
};

interface LeafProps {
  attributes: any;
  children: React.ReactNode;
  leaf: any;
}

const Leaf: React.FC<LeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  // Handle other formatting
  return <span {...attributes}>{children}</span>;
};

export const RenderNode = (node: Node) => {
  if (Text.isText(node)) {
    return (
      <Leaf attributes={{}} leaf={node}>
        {node.text}
      </Leaf>
    );
  }

  const children = node.children
    ? node.children.map((n, i) => (
        <React.Fragment key={i}>{RenderNode(n)}</React.Fragment>
      ))
    : null;

  return (
    <Element attributes={{}} element={node}>
      {children}
    </Element>
  );
};
