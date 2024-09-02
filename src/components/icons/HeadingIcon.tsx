import { IconButton, ThemeUIStyleObject } from "theme-ui";

const HeadingIcon = ({ sx }: { sx?: ThemeUIStyleObject | undefined }) => (
  <IconButton sx={sx}>
    <svg
      aria-label="Toggle header"
      fill={"currentcolor"}
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 20V4h-3v6H9V4H6v16h3v-7h6v7z" />
    </svg>
  </IconButton>
);

export default HeadingIcon;
