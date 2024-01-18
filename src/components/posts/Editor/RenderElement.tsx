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
  // return <Leaf {...props} />;
  console.log(props);

  if (props.text.pressSlash === true || props.leaf.pressSlash) {
    // props.text.text = "";
    return (
      <>
        <Leaf {...props} />
        {props.leaf.placeholder && (
          <span
            style={{
              opacity: 0.3,
              position: "absolute",
              top: "0px",
              left: "5px",
            }}
            contentEditable={false}
          >
            Type CTRL + / to open menu
          </span>
        )}
        {/* <Box sx={{ position: "relative" }} contentEditable={false}>
          <ComponentMenu />
        </Box> */}
      </>
    );
  }
  if (props.leaf.placeholder) {
    // console.log("placehoolder");
    return (
      <>
        <Leaf {...props} />
        <span
          style={{
            opacity: 0.3,
            position: "absolute",
            top: "0px",
            left: "5px",
          }}
          contentEditable={false}
        >
          Type CTRL + / to open menu
        </span>
      </>
    );
  }

  return <Leaf {...props} />;
};

const renderElement = (props: {
  attributes: object;
  children: JSX.Element;
  element: CustomElement;
}) => {
  const { attributes, children, element } = props;
  const units = useUnits();
  const [isHover, setIsHover] = React.useState(false);
  const { isNewComponentMenuOpen, setIsNewComponentMenuOpen } =
    React.useContext(EditorContext);
  // const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
      // const emptyText = children[0].props.text.text.length === 0;
      const editor = useSlateStatic();
      console.log(element);
      return (
        <Flex
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Box
            sx={{
              position: "relative",
              width: ["100%", "690px", "690px"],
              marginX: "auto",
              marginY: "20px",
            }}
          >
            <Text
              as="div"
              sx={{
                position: "relative",
                // marginRight: 'auto',

                fontSize: "19px",
                lineHeight: "30px",
                // marginY: "20px",
                paddingX: ["10px", "0px", "0px"],
                backgroundColor: "#ff000026",
                // fontSize: "19px",
                // lineHeight: "30px",
              }}
              {...attributes}
            >
              {children}
              {/* </Text> */}
            </Text>
            <Text
              sx={{
                display: isHover ? "inherit" : "none",
                position: "absolute",
                top: "0px",
                left: "-30px",
                cursor: "pointer",
                border: "1px solid #e1e1e1",
                paddingY: "3px",
                paddingX: "4px",
                borderRadius: "3px",
              }}
              contentEditable={false}
              onClick={() => {
                const path = ReactEditor.findPath(editor, element);
                console.log(path);
                const markTypeToAdd = "pressSlash";
                // const { selection } = editor;

                // if (!selection) {
                //   return;
                // }
                // const [currentNode, path] = Editor.node(editor, selection);
                // if (currentNode) {
                // editor.addMark("pressSlash", true);
                // const match = (n) => Node.string(n).length > 0;

                Transforms.setNodes(editor, { pressSlash: true }, { at: path });

                // Transforms.insertNodes(
                //   editor,
                //   { type: "paragraph", children: [{ text: "fuck" }] },
                //   { at: path }
                // );
                // Transforms.removeNodes(editor, { at: path });

                // }
              }}
            >
              +
            </Text>
            {element.pressSlash === true && (
              <Box sx={{ position: "relative" }} contentEditable={false}>
                <ComponentMenu />
              </Box>
            )}
          </Box>
        </Flex>
      );
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
export { renderLeaf };
