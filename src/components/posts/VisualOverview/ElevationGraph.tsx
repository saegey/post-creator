import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceArea,
  Rectangle,
} from "recharts";
import { Box, Button, Flex, IconButton, Spinner, useThemeUI } from "theme-ui";
import React from "react";
import { useSlateStatic, ReactEditor } from "slate-react";
import { Transforms } from "slate";

import { ActivityItem, VisualOverviewType } from "../../../types/common";
import { useUnits } from "../../UnitProvider";
import { useViewport } from "../../ViewportProvider";
import ZoomOut from "../../icons/ZoomOut";
import SaveIcon from "../../icons/SaveIcon";
import BackIcon from "../../icons/BackIcon";

const getNiceTickValues = (left: number, right: number) => {
  const range = right - left;

  // Define "nice" intervals (1, 10, 50, 100, 200, etc.)
  const intervals = [1, 10, 20, 50, 100, 200, 500, 1000];

  // Find an appropriate interval based on the range
  const roughInterval = range / 4; // Targeting 4 intervals, which gives 5 ticks
  const niceInterval =
    intervals.find((interval) => interval >= roughInterval) || intervals[0];

  // Generate the tick values based on the selected interval
  const ticks = [];
  for (let i = left; i <= right; i += niceInterval) {
    ticks.push(i);
  }

  return ticks;
};

const getNiceTickValuesY = (min: number, max: number) => {
  const intervals = [10, 50, 100, 200, 500, 1000, 2000, 5000]; // Define possible intervals
  const range = Math.max(max) - min; // Ensure max is at least 1000

  // Calculate the rough interval based on the range
  const roughInterval = range / 4; // Targeting 4 intervals for 5 ticks
  const niceInterval =
    intervals.find((interval) => interval >= roughInterval) || intervals[0];

  // Generate ticks starting from min and stepping by niceInterval
  const ticks = [];
  const targetMax = Math.max(max) + niceInterval; // Add one more interval beyond max
  for (let i = min; i <= targetMax; i += niceInterval) {
    ticks.push(i);
  }

  return ticks;
};

export interface ElevationGraphProps {
  data: Array<ActivityItem> | undefined;

  setMarker: React.Dispatch<React.SetStateAction<ActivityItem | undefined>>;
  element: VisualOverviewType;
  view: boolean;
  setSelection: React.Dispatch<
    React.SetStateAction<[number, number] | undefined>
  >;
  selection: [number, number] | undefined;
  isSaved: boolean;
  left: number;
  right: number;
  top: number | string;
  bottom: number | string;
  showZoom: boolean;
  showSaveButton: boolean;
  showZoomOut: boolean;
  setIsZoomedOut: React.Dispatch<React.SetStateAction<boolean>>;
}

const ElevationGraph = ({
  data,
  setMarker,
  selection,
  setSelection,
  isSaved,
  element,
  view = true,
  left,
  right,
  top,
  bottom,
  showZoom = false,
  showSaveButton = false,
  showZoomOut = false,
  setIsZoomedOut,
}: ElevationGraphProps) => {
  if (!data || data.length === 0) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  const { width } = useViewport();
  const editor = element && !view && useSlateStatic();
  const path =
    element && !view && editor
      ? ReactEditor.findPath(editor, element)
      : undefined;
  const themeContext = useThemeUI();
  const units = useUnits();
  const hideAxes = width > 500 ? false : true;
  const initialState = {
    refAreaLeft: "",
    refAreaRight: "",
  };
  const [zoomGraph, setZoomGraph] = React.useState(initialState);

  const saveState = () => {
    if (editor && selection && path) {
      Transforms.setNodes(
        editor,
        {
          ...element,
          selectionStart: selection[0],
          selectionEnd: selection[1],
        } as VisualOverviewType,
        {
          at: path,
        }
      );
      // setZoomGraph((prev) => ({
      //   ...prev,
      //   showSaveButton: false,
      // }));
    }
  };

  const clearSelection = () => {
    if (editor && path) {
      Transforms.setNodes(
        editor,
        {
          ...element,
          selectionStart: undefined,
          selectionEnd: undefined,
          left: undefined,
          right: undefined,
          top: undefined,
          bottom: undefined,
        } as VisualOverviewType,
        {
          at: path,
        }
      );
    }
    setSelection(undefined);
    setIsZoomedOut(true);
  };

  const zoomOut = () => {
    setSelection(undefined);
    setIsZoomedOut(true);
  };

  const CustomCursor = (props: {
    height?: number;
    points?: Array<{ x: number; y: number }>;
  }) => {
    const { height, points } = props;
    if (!points) {
      return;
    }
    return (
      <Rectangle
        fill={themeContext?.theme?.colors?.background as string}
        stroke={themeContext?.theme?.colors?.text as string}
        strokeWidth={1}
        x={points[0].x}
        y={points[0].y}
        width={1}
        height={height}
        style={{ cursor: "crosshair" }}
      />
    );
  };

  const backToSegment = () => {
    if (element.selectionStart && element.selectionEnd) {
      setSelection([element.selectionStart, element.selectionEnd]);
      setIsZoomedOut(false);
    }
  };

  const zoom = () => {
    let { refAreaLeft, refAreaRight } = zoomGraph;

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setZoomGraph((prev) => ({
        ...prev,
        refAreaLeft: "",
        refAreaRight: "",
      }));
      return;
    }

    if (refAreaLeft && refAreaRight && refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, "e", 50);

    setZoomGraph((prev) => ({
      ...prev,
      refAreaLeft: "",
      refAreaRight: "",
    }));
    const lowBound = data.findIndex((d) => Number(d.d) === Number(refAreaLeft));
    const highBound = data.findIndex((d) => {
      return Number(d.d) === Number(refAreaRight);
    });
    setSelection([lowBound, highBound]);
    setIsZoomedOut(false);
  };

  const { refAreaLeft, refAreaRight } = zoomGraph;

  const points = data.map(
    (d, i) => new Object({ x: d.d, y: d.e, i: i })
  ) as Array<{ x: number; y: number; i: number }>;

  const yTicks = getNiceTickValuesY(Number(bottom), Number(top));

  return (
    <Box
      sx={{
        width: "100%",
        height: ["130px", "200px", "200px"],
        borderWidth: "1px",
        // paddingBottom: [0, "20px", "40px"],
        paddingX: 0,
        userSelect: "none",
      }}
    >
      <Flex
        sx={{
          gap: "10px",
          marginBottom: "10px",
          marginX: ["10px", "0px", "0px"],
        }}
      >
        <IconButton
          variant="primaryButton"
          sx={{
            display: showZoomOut ? "inherit" : "none",
            width: "fit-content",
          }}
          onClick={() => zoomOut()}
        >
          <ZoomOut />
        </IconButton>

        <IconButton
          variant="primaryButton"
          sx={{
            display: isSaved && !showSaveButton ? "inherit" : "none",
            width: "fit-content",
          }}
          onClick={() => backToSegment()}
        >
          <BackIcon />
        </IconButton>

        <Button
          variant="primaryButton"
          sx={{
            display: !view && element && element.left ? "inherit" : "none",
          }}
          onClick={() => clearSelection()}
        >
          Clear Selection
        </Button>
        <IconButton
          variant="primaryButton"
          sx={{
            width: "fit-content",
            // color: "red",
            visibility:
              selection && !view && showSaveButton ? "visible" : "hidden",
          }}
          onClick={() => saveState()}
        >
          <SaveIcon />
        </IconButton>
      </Flex>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart
          height={300}
          // key={data[0].e}
          data={points}
          onMouseDown={(e) => {
            if (selection) {
              return;
            }
            setZoomGraph((prev) => ({
              ...prev,
              refAreaLeft: e && e.activeLabel ? e.activeLabel : "",
            }));
          }}
          onMouseMove={(e) => {
            if (!e || !e.activePayload) {
              setMarker(undefined);
              return;
            }

            setMarker(e.activePayload[0].payload as ActivityItem);

            if (!selection) {
              zoomGraph.refAreaLeft &&
                setZoomGraph((prev) => ({
                  ...prev,
                  refAreaRight: e.activeLabel ? e.activeLabel : "",
                }));
            }
          }}
          onMouseUp={() => {
            if (selection) {
              return;
            }
            zoom();
          }}
          margin={{ top: 10, right: 0, left: hideAxes ? 0 : 20, bottom: 30 }}
        >
          {!hideAxes && (
            <CartesianGrid stroke={String(themeContext.theme.colors?.border)} />
          )}

          <Tooltip active={false} cursor={<CustomCursor />} content={<></>} />
          {/* <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="1" y2="0">
              <GradeGradient data={downSampledData} xMax={xMax} />
            </linearGradient>
          </defs> */}
          {/* {!hideAxes && ( */}
          <XAxis
            hide={hideAxes}
            allowDataOverflow
            dataKey="x"
            type="number"
            // domain={[0, 100]}
            // domain={left && right ? [left, right] : undefined}
            // tickCount={5}
            domain={[0, "dataMax"]}
            label={{
              value: `Distance (${
                units.unitOfMeasure === "metric" ? "km" : "mi"
              })`,
              position: "bottom",
              fontSize: hideAxes ? "0px" : "14px",
            }}
            allowDecimals={false}
            tickFormatter={(t) => t.toFixed(0)}
            tick={{
              fill: themeContext?.theme?.colors?.primary as string,
              fontSize: "14px",
            }}
            ticks={left && right ? getNiceTickValues(left, right) : undefined} // Use calculated tick values
            // hide={hideAxes}
            stroke={themeContext?.theme?.colors?.primary as string}
          />
          {/* )} */}
          {/* {!hideAxes && ( */}
          <YAxis
            allowDataOverflow
            domain={[bottom, yTicks[yTicks.length - 1]]}
            type="number"
            label={{
              value: `Elevation (${
                units.unitOfMeasure === "metric" ? "m" : "ft"
              })`,
              angle: -90,
              position: "left",
              fontSize: "14px",
            }}
            allowDecimals={false}
            dataKey="y"
            ticks={yTicks} // Generate tick values
            tickFormatter={(t) => t.toFixed(0)}
            stroke={themeContext?.theme?.colors?.primary as string}
            hide={hideAxes}
          />
          {/* )} */}
          <Area
            type={"linear"}
            dataKey="y"
            fill={themeContext?.theme?.colors?.text as string}
            fillOpacity={0.2}
            dot={false}
            stroke={themeContext?.theme?.colors?.text as string}
            strokeOpacity={0.2}
            isAnimationActive={false}
          />
          {refAreaLeft && refAreaRight ? (
            <ReferenceArea
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={1}
              fill={themeContext?.theme?.colors?.text as string}
            />
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ElevationGraph;
