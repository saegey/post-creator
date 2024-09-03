import { IconButton, ThemeUIStyleObject } from "theme-ui";

const LinkedinIcon = ({ sx }: { sx?: ThemeUIStyleObject | undefined }) => {
  return (
    <IconButton aria-label="Share on Linkedin" sx={sx}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.55123 8.41991C7.53309 8.41991 8.32903 7.62397 8.32903 6.64212C8.32903 5.66027 7.53309 4.86432 6.55123 4.86432C5.56938 4.86432 4.77344 5.66027 4.77344 6.64212C4.77344 7.62397 5.56938 8.41991 6.55123 8.41991Z"
          fill="currentcolor"
        />
        <path
          d="M9.95719 9.73378H12.9036V11.0835C12.9036 11.0835 13.7031 9.48445 15.8786 9.48445C17.8191 9.48445 19.4267 10.4404 19.4267 13.3543V19.4989H16.3734V14.0989C16.3734 12.38 15.4557 12.1909 14.7564 12.1909C13.3052 12.1909 13.0567 13.4427 13.0567 14.3231V19.4989H9.95719V9.73378Z"
          fill="currentcolor"
        />
        <path
          d="M5.00148 9.73373H8.10099V19.4989H5.00148V9.73373Z"
          fill="currentcolor"
        />
      </svg>
    </IconButton>
  );
};

export default LinkedinIcon;
