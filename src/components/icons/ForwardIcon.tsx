import { IconButton, ThemeUIStyleObject } from "theme-ui";

const ForwardIcon = ({ sx }: { sx?: ThemeUIStyleObject | undefined }) => (
  <IconButton sx={sx}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 6L15 12L9 18"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconButton>
);

export default ForwardIcon;
