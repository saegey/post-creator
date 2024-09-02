import { IconButton, ThemeUIStyleObject } from "theme-ui";

const MatchesBurnedIcon = ({ sx }: { sx?: ThemeUIStyleObject | undefined }) => {
  return (
    <IconButton sx={sx}>
      <svg
        version="1.1"
        id="Capa_1"
        viewBox="0 0 25.953 25.953"
        className="childButton"
      >
        <g>
          <path
            fill="currentcolor"
            d="M6.953,0.445C5.178,1.437,0,6.42,0,15.02c0,2.961,1.391,7.8,4.984,10.487
		c-0.393-0.471-4.069-8.257-0.586-14.132c1.518,6.439,4.261,2.668,2.437-3.181c2.243,1.906,3.825,6.479,0.827,10.199
		c1.938-0.73,4.291-1.858,4.291-5.501S7.418,3.093,6.953,0.445z"
          />

          <line
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            fill="none"
            x1="7.953"
            y1="22.686"
            x2="24.953"
            y2="13.445"
          />
          <ellipse
            fill="currentcolor"
            cx="8.313"
            cy="22.447"
            rx="2.448"
            ry="1.808"
          />
        </g>
      </svg>
    </IconButton>
  );
};

export default MatchesBurnedIcon;
