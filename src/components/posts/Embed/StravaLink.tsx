import { Box, Flex, Embed } from "theme-ui";
import React from "react";
import { Transforms } from "slate";
import { useSlateStatic, ReactEditor } from "slate-react";

import { StravaEmbed } from "../../../types/common";
import HoverAction from "../Editor/HoverAction";
import OptionsMenu from "../Editor/OptionsMenu";

const StravaLink = ({ element }: { element: StravaEmbed }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const iframeRef = React.useRef<HTMLIFrameElement>(null);

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
  }, []);

  if (!element.activityId) {
    return <></>;
  }

  return (
    <HoverAction element={element}>
      <Flex
        contentEditable={false}
        variant="boxes.componentCard"
        key="strava-link"
        sx={{ justifyContent: "center" }}
      >
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
        <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
          <OptionsMenu>
            <Box
              onClick={() => {
                Transforms.removeNodes(editor, { at: path });
              }}
              variant="boxes.dropdownMenuItem"
            >
              Remove
            </Box>
          </OptionsMenu>
        </Box>
      </Flex>
    </HoverAction>
  );
};

export default StravaLink;
