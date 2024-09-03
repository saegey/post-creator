import React from "react";
import { Box, Input, Checkbox, Flex, Label, IconButton } from "theme-ui";
import { BaseSelection, Transforms } from "slate";

import { insertLink } from "../../../../../utils/link";
import usePopup from "../../../../usePopup";
import { CustomEditor } from "../../../../../types/common";
import LinkIcon from "../../../../icons/LinkIcon";

const LinkButton = ({ editor }: { editor: CustomEditor }) => {
  const linkInputRef = React.useRef<HTMLDivElement>(null);
  const { showPopup, setShowPopup } = usePopup(linkInputRef);
  const [url, setUrl] = React.useState("");
  const [showInNewTab, setShowInNewTab] = React.useState(false);
  const [selection, setSelection] = React.useState<BaseSelection>();

  const handleInsertLink = () => {
    if (!selection) {
      return;
    }
    Transforms.select(editor, selection);
    insertLink(editor, { url, showInNewTab });
    setUrl("");
    setShowPopup((prev) => !prev);
    setShowInNewTab(false);
  };

  const toggleLink = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setSelection(editor.selection);
    setShowPopup((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      setShowInNewTab((prev) => !prev);
    } else {
      setUrl(e.target.value);
    }
  };

  return (
    <Box
      ref={linkInputRef}
      sx={{ position: "relative", display: "inline" }}
      onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        toggleLink(e)
      }
    >
      <LinkIcon sx={{ color: "floatingMenuIcon" }} />
      {showPopup && (
        <Box
          sx={{
            position: "absolute",
            top: "40px",
            left: "-105px",
            width: "300px",
            backgroundColor: "linkButtonBackground",
            borderColor: "linkButtonBorder",
            borderWidth: "1px",
            borderStyle: "solid",
            height: "fit-content",
            padding: "5px",
            borderRadius: "5px",
            zIndex: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: "4px", margin: "5px 2px" }}>
            <Input
              id="url"
              name="url"
              value={url}
              placeholder="https://google.com"
              variant={"defaultInput"}
              onChange={(e) => handleInputChange(e)}
            />
            <Box onClick={() => handleInsertLink()}>
              <IconButton>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title />

                  <g id="Complete">
                    <g data-name="add" id="add-2">
                      <g>
                        <line
                          fill="none"
                          stroke="var(--theme-ui-colors-text)"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="12"
                          x2="12"
                          y1="19"
                          y2="5"
                        />

                        <line
                          fill="none"
                          stroke="var(--theme-ui-colors-text)"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="5"
                          x2="19"
                          y1="12"
                          y2="12"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </IconButton>
            </Box>
          </Box>
          <Flex>
            <Label>
              <Checkbox onChange={handleInputChange} />
              <span style={{ fontSize: "14px" }}>Open in new tab</span>
            </Label>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default LinkButton;
