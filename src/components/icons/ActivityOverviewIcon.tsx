import { Box } from "theme-ui";

const ActivityOverviewIcon = ({ color }: { color: string }) => {
  return (
    <Box
      sx={{
        ".cls-1": {
          fill: "none",
          stroke: color ? color : "text",
          strokeMiterlimit: "10",
          strokeWidth: "1.92px",
        },
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        className="childButton"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="roll_brush" data-name="roll brush">
          <line className="cls-1" x1="0.47" y1="4.34" x2="23.49" y2="4.34" />

          <line className="cls-1" x1="0.47" y1="12.01" x2="23.49" y2="12.01" />

          <line className="cls-1" x1="0.47" y1="19.68" x2="23.49" y2="19.68" />

          <line className="cls-1" x1="19.66" y1="0.5" x2="19.66" y2="23.52" />

          <line className="cls-1" x1="11.98" y1="0.5" x2="11.98" y2="23.52" />

          <line className="cls-1" x1="4.31" y1="0.5" x2="4.31" y2="23.52" />
        </g>
      </svg>
    </Box>
  );
};

export default ActivityOverviewIcon;
