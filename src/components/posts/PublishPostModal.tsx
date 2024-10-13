import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Text,
  Box,
  Input,
  Button,
  Checkbox,
  IconButton,
  Label,
} from "theme-ui";

import { EditorContext } from "./Editor/EditorContext";
import StandardModal from "../shared/StandardModal";
import { useSlateContext } from "../SlateContext";
import CopyIcon from "../icons/CopyIcon";
import { PostContext } from "../PostContext";
import { NotificationContext } from "../NotificationContext";

const PublishPostModal = () => {
  const { editor } = useSlateContext();
  const { isPublishedConfirmationOpen, setIsPublishedConfirmationOpen } =
    React.useContext(EditorContext);
  const { id } = React.useContext(PostContext);
  const [checked, setChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isPublishing } = React.useContext(EditorContext);
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
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      navigator.clipboard.writeText(inputValue).then(() => {
        // alert("Text copied to clipboard: " + inputValue);
        setNotification({
          message: "Link copied to clipboard",
          type: "Info",
        });
      });
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
        title="Public link created"
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
              {isPublishing ? <Text>Publishing...</Text> : null}
              <Box
                sx={{
                  backgroundColor: "surfaceLight",
                  borderRadius: "10px",
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
                    value={postUrl}
                    sx={{
                      borderWidth: 0,
                      fontSize: "22px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      width: "100%", // Make Input take up available space
                      maxWidth: "calc(100% - 120px)", // Ensure it doesn't overflow the container
                    }}
                    readOnly={true}
                    ref={inputRef}
                  />
                  <Button
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      whiteSpace: "nowrap", // Ensures text doesn't wrap
                      paddingY: "10px",
                      paddingX: "15px",
                      borderRadius: "10px",
                      flexShrink: 0, // Prevent the button from shrinking
                    }}
                    onClick={handleCopyClick}
                  >
                    <Flex sx={{ gap: "5px", alignItems: "center" }}>
                      <IconButton
                        sx={{
                          width: "25px",
                          height: "25px",
                          color: "secondary",
                        }}
                      >
                        <CopyIcon />
                      </IconButton>
                      <Text sx={{ color: "secondary" }}>Copy Link</Text>
                    </Flex>
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </StandardModal>
    </>
  );
};

export default PublishPostModal;
