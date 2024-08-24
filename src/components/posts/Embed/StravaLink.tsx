import { Box, Flex, Text } from "theme-ui";
import React from "react";
import { Transforms } from "slate";
import { useSlateStatic, ReactEditor } from "slate-react";

import { StravaEmbed } from "../../../types/common";
import HoverAction from "../Editor/HoverAction";
import OptionsMenu from "../Editor/OptionsMenu";
import { moveNodeDown, moveNodeUp } from "../../../utils/SlateUtilityFunctions";
import { PostContext } from "../../PostContext";

const StravaLink = ({
  element,
  children,
}: {
  element: StravaEmbed;
  children: JSX.Element;
}) => {
  const { stravaUrl } = React.useContext(PostContext);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);

  React.useEffect(() => {
    const resizeParentToIframe = (event: MessageEvent) => {
      console.log(event, event.data[2]);
      if (event.origin !== "https://strava-embeds.com") return;
      // Change to match the origin of the iframe content

      const height = event.data[2] + "px";
      if (iframeRef.current && iframeRef.current.parentElement) {
        iframeRef.current.parentElement.style.height = height;
      }
    };

    window.addEventListener("message", resizeParentToIframe);

    return () => {
      window.removeEventListener("message", resizeParentToIframe);
    };
  }, [stravaUrl]);

  if (!element.activityId) {
    return <></>;
  }
  console.log("render StravaLink");

  const stravaEmbed = React.useMemo(() => {
    console.log("stravaEmbed");
    return (
      <Box
        sx={{
          position: "relative",
        }}
      >
        <iframe
          src={`https://strava-embeds.com/activity/${element.activityId}`}
          style={{
            height: "100%",
            width: "100%",
            border: "none",
          }}
          ref={iframeRef}
        />
      </Box>
    );
  }, [stravaUrl]);

  return (
    <HoverAction element={element}>
      <>
        <Flex
          contentEditable={false}
          variant="boxes.componentCard"
          key="strava-link"
          sx={{ justifyContent: "center" }}
        >
          {stravaEmbed}
          <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
            <OptionsMenu
              isOpen={isOptionsOpen}
              setIsOpen={setIsOptionsOpen}
              path={path}
            >
              <>
                <Box
                  onClick={(e) => {
                    moveNodeUp(editor, path);
                    setIsOptionsOpen(false);
                  }}
                  variant="boxes.dropdownMenuItem"
                >
                  <Text sx={{ fontSize: ["14px", "16px", "16px"] }}>
                    Move Up
                  </Text>
                </Box>
                <Box
                  onClick={(e) => {
                    moveNodeDown(editor, path);
                    setIsOptionsOpen(false);
                    // setAddCaption(false);
                  }}
                  variant="boxes.dropdownMenuItem"
                >
                  <Text sx={{ fontSize: ["14px", "16px", "16px"] }}>
                    Move Down
                  </Text>
                </Box>
                <Box
                  onClick={() => {
                    Transforms.removeNodes(editor, { at: path });
                  }}
                  variant="boxes.dropdownMenuItem"
                >
                  Remove
                </Box>
              </>
            </OptionsMenu>
          </Box>
        </Flex>
        {children}
      </>
    </HoverAction>
  );
};

export default StravaLink;
