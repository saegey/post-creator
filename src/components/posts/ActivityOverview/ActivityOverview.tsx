import React from "react";

import { UnitContextType, useUnits } from "../../UnitProvider";
import { formatTime, formatValue, formatAnalysis } from "./helper";
import ActivityOverviewTemplate from "./ActivityOverviewTemplate";
import { ActivityData, ActivityItem } from "./types";

const getItemData = (
  data: ActivityData,
  units: UnitContextType,
  selectedFields: string[]
): ActivityItem[] => {
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
    // timeInRed,
  } = data;

  const items: ActivityItem[] = [
    {
      title: "Normalized Power",
      value: normalizedPower ? `${normalizedPower.toFixed()} watts` : "no data",
    },
    {
      title: "Elevation Gain",
      value: elevationGain
        ? formatValue(elevationGain, units.unitOfMeasure)
        : "-",
    },
    {
      title: "Avg Heart Rate",
      value: heartAnalysis
        ? `${formatAnalysis(heartAnalysis, Object.keys(heartAnalysis))} bpm`
        : "-",
    },
    {
      title: "Distance",
      value:
        units.unitOfMeasure === "metric"
          ? `${distance?.toFixed(2)} km`
          : `${(distance! * 0.621371).toFixed()} miles`,
    },
    {
      title: "Elapsed Time",
      value: elapsedTime ? formatTime(elapsedTime?.seconds) : "-",
    },
    {
      title: "Moving Time",
      value:
        elapsedTime && stoppedTime
          ? `${formatTime(elapsedTime?.seconds - stoppedTime)}`
          : "-",
    },
    {
      title: "Avg Temperature",
      value:
        units.unitOfMeasure === "metric" && tempAnalysis
          ? `${Number(
              formatAnalysis(tempAnalysis, Object.keys(tempAnalysis))
            ).toFixed()} °C`
          : units.unitOfMeasure === "imperial" && tempAnalysis
          ? `${(
              Number(formatAnalysis(tempAnalysis, Object.keys(tempAnalysis))) *
                (9 / 5) +
              32
            ).toFixed()} °F`
          : "-",
    },
    {
      title: "Avg Speed",
      value:
        units.unitOfMeasure === "metric" &&
        distance &&
        elapsedTime?.seconds &&
        stoppedTime
          ? `${
              distance &&
              elapsedTime?.seconds &&
              (
                ((distance! * 1000) / (elapsedTime.seconds - stoppedTime)) *
                3.6
              ).toFixed(2)
            } km/h`
          : `${
              distance &&
              elapsedTime?.seconds &&
              stoppedTime !== undefined &&
              stoppedTime !== null &&
              (
                (distance / (elapsedTime.seconds - stoppedTime)) *
                2236.9362920544
              ).toFixed(2)
            } mph`,
    },
    {
      title: "Avg Power",
      value: powerAnalysis
        ? formatAnalysis(powerAnalysis, Object.keys(powerAnalysis)) + " watts"
        : "-",
    },
    {
      title: "Time Stopped",
      value: stoppedTime ? formatTime(stoppedTime) : "-",
    },
    {
      title: "Avg Cadence",
      value: cadenceAnalysis
        ? `${formatAnalysis(cadenceAnalysis, Object.keys(cadenceAnalysis))} rpm`
        : "-",
    },
    // { title: "Time in Red", value: getTimeInRed(timeInRed) },
  ];

  return items.filter((item) => selectedFields.includes(item.title));
};

const ActivityOverview = ({
  data,
  selectedFields,
}: {
  data: ActivityData;
  selectedFields: Array<
    | "Normalized Power"
    | "Avg Heart Rate"
    | "Distance"
    | "Elevation Gain"
    | "Avg Temperature"
    | "Avg Speed"
    | "Elapsed Time"
    | "Stopped Time"
    | "Avg Cadence"
    | "Avg Power"
  >;
}) => {
  const units = useUnits();

  const items = React.useMemo(
    () => getItemData(data, units, selectedFields),
    [data, units, selectedFields]
  );

  return <ActivityOverviewTemplate items={items} />;
};

export default ActivityOverview;
export { getItemData };
