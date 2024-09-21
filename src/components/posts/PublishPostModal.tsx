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

const PublishPostModal = () => {
  const { editor } = useSlateContext();
  const { isPublishedConfirmationOpen, setIsPublishedConfirmationOpen } =
    React.useContext(EditorContext);
  const [checked, setChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isPublishing } = React.useContext(EditorContext);

  if (!editor) {
    throw new Error("Editor is not defined");
  }

  const handleCopyClick = () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      navigator.clipboard.writeText(inputValue).then(() => {
        alert("Text copied to clipboard: " + inputValue);
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
              <Input
                defaultValue={"htttp://localhost:3000/posts/123"}
                sx={{
                  backgroundColor: "surfaceLight",
                  borderWidth: 0,
                  fontSize: "22px",
                  padding: "25px",
                  borderRadius: "10px",
                }}
                readOnly={true}
                ref={inputRef}
              />
              <Button
                sx={{
                  top: "50%",
                  right: "10px",
                  position: "absolute",
                  transform: "translateY(-50%)",
                  paddingY: "15px",
                  borderRadius: "10px",
                }}
                onClick={handleCopyClick}
              >
                <Flex sx={{ gap: "3px", alignItems: "center" }}>
                  <IconButton sx={{ width: "25px", height: "25px" }}>
                    <CopyIcon />
                  </IconButton>
                  <Text>Copy Link</Text>
                </Flex>
              </Button>
            </Box>
          </Flex>
        </Flex>
      </StandardModal>
    </>
  );
};

export default PublishPostModal;
