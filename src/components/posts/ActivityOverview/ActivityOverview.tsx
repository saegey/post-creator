import { Box, Text, Grid } from "theme-ui";
import React from "react";

import { useUnits } from "../../UnitProvider";

interface Item {
  title: string;
  value: string;
}

type RaceStatsProps = {
  items: Item[];
};

const getTimeInRed = (timeInRed: number | string | undefined | null) => {
  if (timeInRed === "....") {
    return "....";
  }
  if (timeInRed === 0 || timeInRed === null) {
    return "no power data";
  }
  if (typeof timeInRed === "number") {
    return `${new Date(timeInRed * 1000).toISOString().substr(11, 8)}`;
  }
  return "---";
};

const RaceStats = ({ items }: RaceStatsProps) => {
  return (
    <Grid
      gap={2}
      columns={[2, 2, 3]}
      sx={{
        borderRadius: "4px",
        gap: ["10px", "5px 100px", "5px"],
      }}
    >
      {items.map((item, index) => {
        return (
          <Box key={`box-${index}`}>
            <>
              <Text
                sx={{
                  fontWeight: "500",
                  textTransform: "uppercase",
                  fontSize: ["12px", "13px", "13px"],
                  color: "text",
                  marginBottom: "3px",
                }}
                as="div"
              >
                {item.title}
              </Text>
              <Text
                as="div"
                sx={{
                  fontFamily: "body",
                  fontSize: ["20px", "24px", "24px"],
                  lineHeight: ["20px", "24px", "24px"],
                  fontWeight: ["600", "600", "600"],
                  marginBottom: "10px",
                  // lineHeight: ['30px', '50px', '60px'],
                }}
              >
                {item.value}
              </Text>
            </>
          </Box>
        );
      })}
    </Grid>
  );
};

type Props = {
  data: {
    elevationGain?: number | null;
    distance?: number | null;
    normalizedPower?: number | null;
    heartAnalysis?: Record<"entire" | number, number>[] | undefined;
    // heartAnalysis: Map<"entire", number>[] | undefined;
    tempAnalysis?: Record<string | number, number>[] | undefined;
    powerAnalysis?: Record<string | number, number>[] | undefined;
    cadenceAnalysis?: Record<string | number, number>[] | undefined;
    elapsedTime?: {
      seconds: number;
    };
    stoppedTime?: number | null;
    timeInRed?: number | string | undefined | null;
  };
  selectedFields: string[];
};

const RaceOverview: React.FC<Props> = ({ data, selectedFields = [] }) => {
  const {
    normalizedPower,
    elevationGain,
    distance,
    heartAnalysis,
    elapsedTime,
    tempAnalysis,
    stoppedTime,
    powerAnalysis,
    cadenceAnalysis,
    timeInRed,
  } = data;
  console.log("powerAnalysis", powerAnalysis, normalizedPower);
  const units = useUnits();

  const items = [
    {
      title: "Normalized Power",
      value: `${normalizedPower ? normalizedPower.toFixed() : ""} watts`,
    },
    {
      title: "Elevation Gain",
      value:
        units.unitOfMeasure === "metric"
          ? `${elevationGain && elevationGain.toFixed(0)} meters`
          : `${
              elevationGain &&
              (elevationGain * 3.280839895).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
            } ft`,
    },
    {
      title: "Avg Heart Rate",
      value: heartAnalysis
        ? `${heartAnalysis["entire" as keyof Object]} bpm`
        : "undfined",
    },
    {
      title: "Distance",
      value:
        units.unitOfMeasure === "metric"
          ? `${distance && distance.toFixed(2)} km`
          : `${distance && (distance * 0.621371).toFixed()} miles`,
    },
    {
      title: "Elapsed Time",
      value: `${
        elapsedTime &&
        new Date(elapsedTime.seconds * 1000).toISOString().substr(11, 8)
      }`,
    },
    {
      title: "Moving Time",
      value:
        elapsedTime && elapsedTime.seconds
          ? `${new Date(
              (elapsedTime.seconds - (stoppedTime ? stoppedTime : 0)) * 1000
            )
              .toISOString()
              .substr(11, 8)}`
          : "",
    },
    {
      title: "Avg Temperature",
      value:
        units.unitOfMeasure === "metric"
          ? `${Number(
              tempAnalysis ? tempAnalysis["entire" as keyof Object] : 0
            ).toFixed()} °C`
          : tempAnalysis && tempAnalysis["entire" as keyof Object]
          ? `${(
              Number(tempAnalysis["entire" as keyof Object]) * (9 / 5) +
              32
            ).toFixed()} °F`
          : "",
    },
    {
      title: "Avg Speed",
      value:
        units.unitOfMeasure === "metric"
          ? `${
              distance &&
              elapsedTime &&
              (
                ((distance * 1000) /
                  (elapsedTime.seconds - (stoppedTime ? stoppedTime : 0))) *
                3.6
              ).toFixed(2)
            } km/h`
          : `${
              distance &&
              elapsedTime &&
              stoppedTime &&
              (
                (distance / (elapsedTime.seconds - stoppedTime)) *
                2236.9362920544
              ).toFixed(2)
            } mph`,
    },
    {
      title: "Avg Power",
      value: powerAnalysis
        ? `${powerAnalysis["entire" as keyof Object]} watts`
        : "N/A",
    },
    {
      title: "Time Stopped",
      value: stoppedTime
        ? new Date(stoppedTime * 1000).toISOString().substr(11, 8)
        : "",
    },
    {
      title: "Avg Cadence",
      value: cadenceAnalysis
        ? `${cadenceAnalysis["entire" as keyof Object]} rpm`
        : "N/A",
    },
    {
      title: "Time in Red",
      value: getTimeInRed(timeInRed),
    },
  ];

  console.log("elapsedTime", elapsedTime);
  console.log("stoppedTime", stoppedTime);
  // console.log("distance", distance * 1000);
  // console.log(elapsedTime.seconds - (stoppedTime ? stoppedTime : 0));
  // console.log(
  //   (
  //     ((distance * 1000) /
  //       (elapsedTime.seconds - (stoppedTime ? stoppedTime : 0))) *
  //     3.6
  //   ).toFixed(2)
  // );
  return (
    <Box variant="boxes.figure">
      <RaceStats
        items={items.filter((activity) =>
          selectedFields.includes(activity.title)
        )}
      />
    </Box>
  );
};

export default RaceOverview;
