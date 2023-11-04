import React from "react";
import { IconButton } from "theme-ui";

import { EditorContext } from "../../../../posts/Editor/EditorContext";

const NewComponentButton = () => {
  const { setIsGraphMenuOpen, isGraphMenuOpen, setIsImageModalOpen } =
    React.useContext(EditorContext);

  return (
    <IconButton
      onClick={() => {
        if (isGraphMenuOpen) {
          setIsGraphMenuOpen(false);
        } else {
          setIsImageModalOpen(false);
          setIsGraphMenuOpen(true);
        }
      }}
      title="Add Widget"
      variant="iconButton"
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
        className="menu-button"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.75 4.5L4.5 3.75H10.5L11.25 4.5V10.5L10.5 11.25H4.5L3.75 10.5V4.5ZM5.25 5.25V9.75H9.75V5.25H5.25ZM13.5 3.75L12.75 4.5V10.5L13.5 11.25H19.5L20.25 10.5V4.5L19.5 3.75H13.5ZM14.25 9.75V5.25H18.75V9.75H14.25ZM17.25 20.25H15.75V17.25H12.75V15.75H15.75V12.75H17.25V15.75H20.25V17.25H17.25V20.25ZM4.5 12.75L3.75 13.5V19.5L4.5 20.25H10.5L11.25 19.5V13.5L10.5 12.75H4.5ZM5.25 18.75V14.25H9.75V18.75H5.25Z"
          fill="var(--theme-ui-colors-text)"
        />
      </svg>
    </IconButton>
  );
};

export default NewComponentButton;
