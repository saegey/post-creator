import React from "react";
import { Box, Button, Flex, IconButton, Spinner, Text } from "theme-ui";
import { API } from "aws-amplify";
import { AxiosError } from "axios";

import { EditorContext } from "../../posts/Editor/EditorContext";
import CloudCheck from "../../icons/CloudCheck";
import RefreshIcon from "../../icons/RefreshIcon";
import RocketIcon from "../../icons/RocketIcon";
import { PostContext } from "../../PostContext";

const SettingsSection = () => {
  const {
    isSavingPost,
    savingStatus,
    setIsPublishedConfirmationOpen,
    setIsPublishing,
    isPublishing,
  } = React.useContext(EditorContext);

  const { id } = React.useContext(PostContext);

  return (
    <>
      <pre>{isSavingPost}</pre>
      {isSavingPost ? (
        <Flex sx={{ alignItems: "center", gap: "5px" }}>
          <IconButton
            sx={{
              width: "24px",
              animation: "pulse 1.5s ease-in-out infinite",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.2)" },
                "100%": { transform: "scale(1)" },
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
          <Text>{savingStatus}</Text>
          {/* <Spinner /> */}
        </Flex>
      ) : (
        <IconButton sx={{ color: "success" }}>
          <CloudCheck />
        </IconButton>
      )}
      <Button
        onClick={async () => {
          setIsPublishing(true);

          try {
            const res = (await API.post("api12660653", `/post/publish`, {
              body: {
                postId: id,
              },
              response: true,
            })) as {
              data: any;
            };
            setIsPublishing(false);
            setIsPublishedConfirmationOpen(true);

            // console.log(res);
          } catch (err) {
            if (err instanceof AxiosError) {
              setIsPublishing(false);

              throw new Error("network error");
            }
          }
        }}
        sx={{
          borderRadius: ["10px", "10px", "10px"],
          cursor: "pointer",
          paddingX: ["10px", "3px", "12px"],
          paddingY: ["3px", "3px", "6px"],
        }}
      >
        <Flex sx={{ alignItems: "center", gap: "2px" }}>
          <IconButton
            as="div"
            sx={{
              width: ["24px", "24px", "24px"],
              height: ["24px", "24px", "24px"],
              color: "background",
            }}
          >
            {isPublishing ? (
              <Spinner sx={{ color: "background" }} />
            ) : (
              <RocketIcon />
            )}
          </IconButton>
          <Text sx={{ color: "background" }}>Publish</Text>
        </Flex>
      </Button>
    </>
  );
};

export default SettingsSection;
