import { Box, IconButton, ThemeUIStyleObject } from "theme-ui";

const ActivityOverviewIcon = ({
  sx,
}: {
  sx?: ThemeUIStyleObject | undefined;
}) => {
  return (
    <IconButton sx={sx}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        // className="childButton"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="roll_brush" data-name="roll brush">
          <line
            className="cls-1"
            x1="0.47"
            y1="4.34"
            x2="23.49"
            y2="4.34"
            fill="none"
            stroke="currentcolor"
            strokeMiterlimit="10"
            strokeWidth="1.92px"
          />

          <line
            className="cls-1"
            stroke="currentcolor"
            x1="0.47"
            y1="12.01"
            x2="23.49"
            y2="12.01"
            fill="none"
            strokeMiterlimit="10"
            strokeWidth="1.92px"
          />

          <line
            className="cls-1"
            stroke="currentcolor"
            x1="0.47"
            y1="19.68"
            x2="23.49"
            y2="19.68"
            fill="none"
            strokeMiterlimit="10"
            strokeWidth="1.92px"
          />

          <line
            className="cls-1"
            stroke="currentcolor"
            x1="19.66"
            y1="0.5"
            x2="19.66"
            y2="23.52"
            fill="none"
            strokeMiterlimit="10"
            strokeWidth="1.92px"
          />

          <line
            className="cls-1"
            stroke="currentcolor"
            x1="11.98"
            y1="0.5"
            x2="11.98"
            y2="23.52"
            fill="none"
            strokeMiterlimit="10"
            strokeWidth="1.92px"
          />

          <line
            className="cls-1"
            stroke="currentcolor"
            x1="4.31"
            y1="0.5"
            x2="4.31"
            y2="23.52"
            fill="none"
            strokeMiterlimit="10"
            strokeWidth="1.92px"
          />
        </g>
      </svg>
    </IconButton>
  );
};

export default ActivityOverviewIcon;
