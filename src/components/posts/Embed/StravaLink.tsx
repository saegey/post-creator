import { Box, Flex, Theme, ThemeUIStyleObject } from "theme-ui";
import React from "react";
import { useSlateStatic, ReactEditor } from "slate-react";

import { StravaEmbed } from "../../../types/common";
import HoverAction from "../Editor/HoverAction";
import { PostContext } from "../../PostContext";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";

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

  const { optionsMenu } = useOptionsMenu(editor, path);

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
        sx={
          {
            position: "relative",
          } as ThemeUIStyleObject<Theme>
        }
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
          sx={{ justifyContent: "center" } as ThemeUIStyleObject<Theme>}
        >
          {stravaEmbed}
          {optionsMenu}
        </Flex>
        {children}
      </>
    </HoverAction>
  );
};

export default StravaLink;
