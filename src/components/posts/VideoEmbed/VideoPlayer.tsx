import React from "react";
import { Box, Flex, Text } from "theme-ui";
import MuxPlayer from "@mux/mux-player-react";
import { useThemeUI } from "theme-ui";
import { PubSub } from "aws-amplify";
import { ZenObservable } from "zen-observable-ts";
import { Transforms, Element as SlateElement } from "slate";
import {
  useSlateStatic,
  ReactEditor,
  useSelected,
  useFocused,
} from "slate-react";

import { VideoEmbedType } from "../../../types/common";
import {
  attachIoTPolicyToUser,
  configurePubSub,
  getEndpoint,
} from "../../../actions/PubSub";
import { PostContext } from "../../PostContext";
import { PostSaveComponents } from "../../../actions/PostSave";

const VideoPlayer = ({ element }: { element: VideoEmbedType }) => {
  const { theme } = useThemeUI();
  const [subPubConfigured, setSubPubConfigured] = React.useState(false);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const { id, title, postLocation, heroImage } = React.useContext(PostContext);

  const setUpSub = async () => {
    if (!subPubConfigured && !element.isReady) {
      const endpoint = await getEndpoint();
      await configurePubSub(endpoint);
      await attachIoTPolicyToUser();
      setSubPubConfigured(true);
    }

    return PubSub.subscribe(`post-${id}`).subscribe({
      next: async (data: any) => {
        // console.log(data);
        if (data.value.type === "video.asset.ready") {
          console.log("asseet reead");
          Transforms.setNodes(
            editor,
            {
              isReady: true,
            } as VideoEmbedType,
            { at: [path as any] }
          );

          await PostSaveComponents({
            postId: id,
            title: title,
            postLocation: postLocation,
            components: editor.children,
            heroImage: heroImage ? JSON.stringify(heroImage) : "",
          });
        }
      },
      error: (error: any) => console.error(error),
    });
  };

  React.useEffect(() => {
    let subUpdates: ZenObservable.Subscription;

    setUpSub().then((sub) => {
      subUpdates = sub;
    });

    return () => {
      if (subUpdates) {
        subUpdates.unsubscribe();
      }
    };
  }, [subPubConfigured]);

  return (
    <Flex sx={{ width: "100%", justifyContent: "center" }}>
      <Box sx={{ width: "600px", height: "auto" }}>
        {!element.isReady && <Text>Loading</Text>}
        {element.isReady && (
          <MuxPlayer
            playbackId={element.playbackId}
            metadata={{
              video_id: "video-id-123456",
              video_title: "Bick Buck Bunny",
              viewer_user_id: "user-id-bc-789",
            }}
            accentColor={theme?.colors?.videoAccent as string}
            streamType="on-demand"
          />
        )}
      </Box>
    </Flex>
  );
};
export default VideoPlayer;
