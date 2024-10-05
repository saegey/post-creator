import MuxUploader from "@mux/mux-uploader-react";
import { API } from "aws-amplify";
import React from "react";

import { CustomEditor } from "../../../types/common";
import { Transforms } from "slate";
import { usePost } from "../../PostContext";
import { EditorContext } from "../Editor/EditorContext";

const VideoUploader = ({ editor }: { editor: CustomEditor }) => {
  const [uploadId, setUploadId] = React.useState<string | undefined>();
  const { id } = usePost();
  const { menuPosition } = React.useContext(EditorContext);

  const getEndpoint = async () => {
    const res = (await API.get("api12660653", `/video/upload?postId=${id}`, {
      response: true,
    })) as any;

    setUploadId(res.data.id);
    return res.data.url;
  };

  const getAssetId = async () => {
    const res = (await API.get(
      "api12660653",
      `/video/upload/asset?uploadId=${uploadId}`,
      {
        response: true,
      }
    )) as any;
    return res;
  };

  return (
    <MuxUploader
      id="this-is-a-test"
      endpoint={getEndpoint}
      onSuccess={() => {
        getAssetId().then((res) => {
          Transforms.insertNodes(
            editor,
            {
              type: "videoEmbed",
              void: true,
              assetId: res.data.assetId,
              playbackId: res.data.playbackId,
              isReady: false,
              children: [{ text: "" }],
            },
            { at: menuPosition.path }
          );

          if (menuPosition.path.length > 1) {
            Transforms.liftNodes(editor);
          }
        });
      }}
    />
  );
};

export default VideoUploader;
