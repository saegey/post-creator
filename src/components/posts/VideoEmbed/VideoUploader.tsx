import MuxUploader from "@mux/mux-uploader-react";
import { API } from "aws-amplify";
import React from "react";
import { CustomEditor, ParagraphElement } from "../../../types/common";
import { Transforms, Element as SlateElement } from "slate";

const VideoUploader = ({ editor }: { editor: CustomEditor }) => {
  const [uploadId, setUploadId] = React.useState<string | undefined>();

  const getEndpoint = async () => {
    const res = (await API.get("api12660653", "/video/upload", {
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
    console.log(res);
    return res;
  };

  return (
    <MuxUploader
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
