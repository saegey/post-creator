import MuxUploader from "@mux/mux-uploader-react";
import { API } from "aws-amplify";
import React from "react";
import { CustomEditor, ParagraphElement } from "../../../types/common";
import { Transforms, Element as SlateElement } from "slate";
import { PostContext } from "../../PostContext";

const VideoUploader = ({ editor }: { editor: CustomEditor }) => {
  const [uploadId, setUploadId] = React.useState<string | undefined>();
  const { id } = React.useContext(PostContext);

  const getEndpoint = async () => {
    const res = (await API.get("api12660653", `/video/upload?postId=${id}`, {
      response: true,
    })) as any;
    console.log(res);
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
    console.log(res);
    return res;
  };

  return (
    <MuxUploader
      id="this-is-a-test"
      endpoint={getEndpoint}
      onSuccess={(e) => {
        getAssetId().then((res) => {
          console.log(res);
          Transforms.insertNodes<SlateElement>(editor, [
            {
              type: "videoEmbed",
              void: true,
              assetId: res.data.assetId,
              playbackId: res.data.playbackId,
              isReady: false,
              children: [{ text: "" }],
            },
            { type: "paragraph", children: [{ text: "" }] } as ParagraphElement,
          ]);
        });
      }}
    />
  );
};

export default VideoUploader;
