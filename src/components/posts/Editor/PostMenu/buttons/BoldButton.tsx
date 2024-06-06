import { IconButton } from "theme-ui";
import React from "react";

import {
  isMarkActive,
  toggleMark,
} from "../../../../../utils/SlateUtilityFunctions";
import { CustomEditor } from "../../../../../types/common";

const BoldButton = ({ editor }: { editor: CustomEditor }) => {
  return (
    <IconButton
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, "bold");
      }}
      title={"Toggle Bold Text"}
      sx={{
        marginX: ["5px", 0, 0],
        marginBottom: ["5px", 0, 0],
        verticalAlign: "top",
      }}
    >
      <svg
        className="menu-button"
        fill={
          isMarkActive(editor, "bold")
            ? "var(--theme-ui-colors-background)"
            : "var(--theme-ui-colors-iconButtonDisabled)"
        }
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.457 11.868A4.47 4.47 0 0 0 18 8.5 5.506 5.506 0 0 0 12.5 3H5v19h8.5a5.497 5.497 0 0 0 2.957-10.132zM8 6h4.5a2.5 2.5 0 0 1 0 5H8zm5.5 13H8v-5h5.5a2.5 2.5 0 0 1 0 5z" />
        <path fill="none" d="M0 0h24v24H0z" />
      </svg>
    </IconButton>
  );
};

export default BoldButton;
