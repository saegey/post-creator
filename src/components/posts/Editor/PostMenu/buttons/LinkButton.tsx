import React from "react";
import { insertLink } from "../../../../../utils/link";

import { Box, Input, Checkbox, Flex, Label, IconButton } from "theme-ui";
import usePopup from "../../../../usePopup";
import { BaseSelection, Transforms } from "slate";
import { CustomEditor } from "../../../../../types/common";

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

  const toggleLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    <Box ref={linkInputRef} sx={{ position: "relative", display: "inline" }}>
      <IconButton
        onMouseDown={(e) => toggleLink(e)}
        title={"Toggle Bold Text"}
        // variant="iconButton"
        sx={{
          marginX: ["5px", 0, 0],
          marginBottom: ["5px", 0, 0],
          verticalAlign: "top",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 8H6C4.34315 8 3 9.34315 3 11V13C3 14.6569 4.34315 16 6 16H10M9 12H15M14 8H18C19.6569 8 21 9.34315 21 11V13C21 14.6569 19.6569 16 18 16H14"
            stroke="var(--theme-ui-colors-iconButtonDisabled)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IconButton>
      {showPopup && (
        <Box
          sx={{
            position: "absolute",
            top: "40px",
            left: "-85px",
            width: "300px",
            backgroundColor: "background",
            height: "fit-content",
            border: "1px solid lightgray",
            padding: "5px",
            borderRadius: "5px",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", gap: "4px", margin: "5px 2px" }}>
            <Input
              id="url"
              name="url"
              value={url}
              placeholder="https://google.com"
              variant={"defaultInput"}
              onChange={(e) => handleInputChange(e)}
            />
            <div onClick={() => handleInsertLink()}>
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
            </div>
          </div>
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
