import { IconButton, ThemeUIStyleObject } from "theme-ui";

const LinkIcon = ({ sx }: { sx?: ThemeUIStyleObject | undefined }) => (
  <IconButton title={"Add link"} sx={sx}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 8H6C4.34315 8 3 9.34315 3 11V13C3 14.6569 4.34315 16 6 16H10M9 12H15M14 8H18C19.6569 8 21 9.34315 21 11V13C21 14.6569 19.6569 16 18 16H14"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconButton>
);

export default LinkIcon;
