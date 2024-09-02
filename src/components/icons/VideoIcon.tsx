import { IconButton, ThemeUIStyleObject } from "theme-ui";

const VideoIcon = ({ sx }: { sx?: ThemeUIStyleObject | undefined }) => {
  return (
    <IconButton sx={sx}>
      <svg width="100%" height="100%" viewBox="0 0 24 24">
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v14h16V5H4zm6.622 3.415l4.879 3.252a.4.4 0 0 1 0 .666l-4.88 3.252a.4.4 0 0 1-.621-.332V8.747a.4.4 0 0 1 .622-.332z"
            fill="currentcolor"
          />
        </g>
      </svg>
    </IconButton>
  );
};

export default VideoIcon;
