import { IconButton, ThemeUIStyleObject } from "theme-ui";

const UploadIcon = ({ sx }: { sx?: ThemeUIStyleObject | undefined }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
  >
    <path
      d="M5 12l1.41 1.41L11 8.83V20h2V8.83l4.59 4.58L19 12l-7-7-7 7z"
      fill="currentcolor"
    />
    <path d="M5 18v2h14v-2H5z" fill="currentcolor" />
  </svg>
);

export default UploadIcon;
