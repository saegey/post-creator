import React, { useEffect, useRef, useState } from "react";
import { Flex, Text, Box, Input, Checkbox, Label } from "theme-ui";
import { API } from "aws-amplify";
import { AxiosError } from "axios";

import { EditorContext } from "./Editor/EditorContext";
import StandardModal from "../shared/StandardModal";
import { useSlateContext } from "../SlateContext";
import CopyIcon from "../icons/CopyIcon";
import { PostContext } from "../PostContext";
import { NotificationContext } from "../NotificationContext";
import Button from "../shared/Button";

const PublishPostModal = () => {
  const { editor } = useSlateContext();
  const {
    isPublishedConfirmationOpen,
    setIsPublishedConfirmationOpen,
    setIsPublishing,
    isPublishing,
  } = React.useContext(EditorContext);
  const { id, privacyStatus, setPost } = React.useContext(PostContext);
  const [checked, setChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [postUrl, setPostUrl] = useState("");
  const { setNotification } = React.useContext(NotificationContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname =
        window.location.origin || process.env.NEXT_PUBLIC_BASE_URL;
      setPostUrl(`${hostname}/posts/${id}`);
    }
  }, []);

  if (!editor) {
    throw new Error("Editor is not defined");
  }

  const handleCopyClick = () => {
    console.log("handleCopyClick");
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      navigator.clipboard.writeText(inputValue).then(() => {
        setNotification({
          message: "Link copied to clipboard",
          type: "Success",
        });
      });
    }
  };

  const handlePublish = async () => {
    console.log("handlePublish");
    try {
      setIsPublishing(true);
      const res = await API.post("api12660653", `/post/publish`, {
        body: {
          postId: id,
        },
        response: true,
      });

      setPost({ privacyStatus: "published" });

      setIsPublishing(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        setIsPublishing(false);
        throw new Error("network error");
      }
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    if (checked) {
      alert("checked");
    }
  }, [checked]);

  return (
    <>
      <StandardModal
        title="Share post link"
        isOpen={isPublishedConfirmationOpen}
        setIsOpen={setIsPublishedConfirmationOpen}
        maxWidth="600px"
      >
        <Flex
          sx={{
            width: "100%",
            height: "fit-content",
          }}
        >
          <Flex
            sx={{ flexDirection: "column", gap: "40px", marginTop: "60px" }}
          >
            <Text as="p" sx={{ fontSize: "17px", lineHeight: "26px" }}>
              A public link has been created. Managed previously shared posts at
              anytime via <b>Settings</b>.
            </Text>
            <Box>
              <Flex>
                <Box>
                  <Label>
                    <Checkbox
                      defaultChecked={true}
                      onChange={(e) => {
                        handleCheckboxChange(e);
                      }}
                    />
                  </Label>
                </Box>
                <Flex
                  sx={{ flexDirection: "column", gap: "3px" }}
                  onClick={() => alert("help")}
                >
                  <Text sx={{ fontWeight: "500" }}>
                    Make this post discoverable
                  </Text>
                  <Text sx={{ fontSize: "14px" }}>
                    Allows it to be shown in web searches
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  backgroundColor: "surfaceLight",
                  borderRadius: "3px",
                  padding: "10px",
                }}
              >
                <Flex
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%", // Make sure the Flex container takes up full width
                    gap: "10px", // Add some spacing between the Input and Button
                  }}
                >
                  <Input
                    value={privacyStatus === "draft" ? "" : postUrl}
                    sx={{
                      borderWidth: 0,
                      fontSize: "22px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      width: "100%", // Make Input take up available space
                      maxWidth: "calc(100% - 20px)", // Ensure it doesn't overflow the container
                    }}
                    readOnly={true}
                    ref={inputRef}
                  />
                  <Button
                    variant="primaryButton"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                      paddingX: ["8px", "10px", "10px"],
                      width: "fit-content",
                      borderRadius: "3px",
                      flexShrink: 0, // Prevent the button from shrinking
                    }}
                    disabled={privacyStatus === "draft"}
                    onClick={handleCopyClick}
                  >
                    <Flex sx={{ gap: "5px", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: ["15px", "15px", "15px"],
                          height: ["15px", "15px", "15px"],
                          color: "secondary",
                        }}
                      >
                        <CopyIcon />
                      </Box>
                    </Flex>
                  </Button>
                </Flex>
              </Box>
            </Box>
            <Flex sx={{ flexGrow: 1, justifyContent: "right" }}>
              <Button
                variant="primaryButton"
                onClick={handlePublish}
                loading={isPublishing}
              >
                <Text sx={{ fontSize: "16px" }}>Publish</Text>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </StandardModal>
    </>
  );
};

export default PublishPostModal;
