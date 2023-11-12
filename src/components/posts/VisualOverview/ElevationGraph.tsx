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
import { Box, Button, Flex, Spinner, useThemeUI } from "theme-ui";
import React from "react";
import { useSlateStatic, ReactEditor } from "slate-react";
import { Transforms } from "slate";

import { useUnits } from "../../UnitProvider";
import { ActivityItem, VisualOverviewType } from "../../../types/common";

function isDefined<T>(argument: T | undefined): argument is T {
  return argument !== undefined;
}

type ActivityEvent = {
  c: Array<number> | Array<null>;
  g: number;
  d: number;
  t: number | null;
  e: number | null;
};

export interface GradeGradientActivty extends ActivityEvent {
  color: string;
}

const ElevationGraph = ({
  downSampledData,
  setMarker,
  selection,
  setSelection,
  isSaved,
  downsampleRate,
  element,
  view = true,
}: {
  downSampledData: Array<GradeGradientActivty>;
  setMarker: React.Dispatch<React.SetStateAction<ActivityItem | undefined>>;
  element: VisualOverviewType;
  view: boolean;
  setSelection: React.Dispatch<
    React.SetStateAction<[number, number] | undefined>
  >;
  selection: [number, number] | undefined;
  isSaved: boolean;
  downsampleRate: number;
}) => {
  if (!downSampledData || downSampledData.length === 0) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  // const [showSaveButton, setShowSaveButton] = React.useState(false);

  const editor = element && !view && useSlateStatic();
  const path =
    element && !view && editor
      ? ReactEditor.findPath(editor, element)
      : undefined;
  const themeContext = useThemeUI();
  const units = useUnits();
  const hideAxes = false;

  const shrunkData = downSampledData
    .map((_, i) => {
      if (i % downsampleRate === 0) {
        return _;
      }
    })
    .filter(isDefined);

  const initialState = {
    data: element && element.selectionStart ? shrunkData : shrunkData,
    left: element && element.left ? element.left : "dataMin",
    right: element && element.right ? element.right : "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top2: element && element.top ? element.top : "dataMax+20",
    bottom2: element && element.bottom ? element.bottom : "dataMin",
    animation: true,
    showSaveButton: false,
    isZoomed: element && element.selectionStart ? true : false,
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
          left: zoomGraph.left,
          right: zoomGraph.right,
          top: zoomGraph.top2,
          bottom: zoomGraph.bottom2,
        } as VisualOverviewType,
        {
          at: path,
        }
      );
      setZoomGraph((prev) => ({
        ...prev,
        showSaveButton: false,
      }));
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

    setZoomGraph((prev) => ({
      ...prev,
      data: shrunkData,
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin",
      right: "dataMax",
      top2: "dataMax+50",
      bottom2: "dataMin",
    }));
    setSelection(undefined);
  };

  const zoomOut = () => {
    setZoomGraph((prev) => ({
      ...prev,
      data: shrunkData,
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin",
      right: "dataMax",
      top2: "dataMax+50",
      bottom2: "dataMin",
      isZoomed: false,
    }));
    setSelection(undefined);
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

  const getAxisYDomain = (
    from: string | undefined,
    to: string | undefined,
    ref: keyof GradeGradientActivty,
    offset: number
  ): (number | string)[] => {
    if (from && to) {
      const lower = shrunkData.findIndex((s) => s.d === Number(from));
      const upper = shrunkData.findIndex((s) => s.d === Number(to));
      const refData = shrunkData.slice(lower, upper);

      let [bottom, top] = [refData[0][ref], refData[0][ref]] as [
        number,
        number
      ];

      refData.forEach((d) => {
        if (Number(d[ref]) > top) {
          top = Number(d[ref]);
        }
        if (Number(d[ref]) < bottom) {
          bottom = Number(d[ref]);
        }
      });
      return [bottom | 0, (top | 0) + offset];
    }

    return [initialState.bottom2, initialState.top2];
  };

  const backToSegment = () => {
    setZoomGraph((prev) => ({
      ...prev,
      isZoomed: true,
      data: element && element.selectionStart ? downSampledData : shrunkData,
      left: element && element.left ? element.left : "dataMin",
      right: element && element.right ? element.right : "dataMax",
      refAreaLeft: "",
      refAreaRight: "",
      top2: element && element.top ? element.top : "dataMax+20",
      bottom2: element && element.bottom ? element.bottom : "dataMin",
    }));
    if (element.selectionStart && element.selectionEnd) {
      setSelection([element.selectionStart, element.selectionEnd]);
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

    const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, "e", 50);

    setZoomGraph(
      (prev) =>
        ({
          ...prev,
          refAreaLeft: "",
          refAreaRight: "",
          data: downSampledData
            .map((_, i) => {
              if (i % 1 === 0) {
                return _;
              }
            })
            .filter(isDefined),
          left: refAreaLeft,
          right: refAreaRight,
          bottom2,
          top2,
          showSaveButton: true,
          isZoomed: true,
        } as any)
    );
    const lowBound = downSampledData.findIndex(
      (d) => Number(d.d) === Number(refAreaLeft)
    );
    const highBound = downSampledData.findIndex((d) => {
      return Number(d.d) === Number(refAreaRight);
    });
    setSelection([lowBound, highBound]);
  };

  const {
    data,
    left,
    right,
    refAreaLeft,
    refAreaRight,
    top2,
    bottom2,
    showSaveButton,
    isZoomed,
  } = zoomGraph;

  return (
    <Box
      sx={{
        width: "100%",
        height: ["150px", "200px", "300px"],
        borderWidth: "1px",
        // paddingBottom: [0, "20px", "40px"],
        paddingX: 0,
        userSelect: "none",
      }}
    >
      <Flex sx={{ gap: "10px", marginBottom: "10px" }}>
        <Button
          variant="primaryButton"
          sx={{
            display: zoomGraph.bottom2 !== "dataMin" ? "inherit" : "none",
          }}
          onClick={() => zoomOut()}
        >
          Zoom Out
        </Button>

        <Button
          variant="primaryButton"
          sx={{
            display:
              isSaved && zoomGraph.bottom2 === "dataMin" ? "inherit" : "none",
          }}
          onClick={() => backToSegment()}
        >
          Back to Segment
        </Button>

        <Button
          variant="primaryButton"
          sx={{
            display: !view && element && element.left ? "inherit" : "none",
          }}
          onClick={() => clearSelection()}
        >
          Clear Selection
        </Button>
        <Button
          variant="primaryButton"
          sx={{
            visibility:
              selection && !view && showSaveButton ? "visible" : "hidden",
          }}
          onClick={() => saveState()}
        >
          Save Selection
        </Button>
      </Flex>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          onMouseDown={(e) => {
            if (isZoomed) {
              return;
            }
            setZoomGraph((prev) => ({
              ...prev,
              refAreaLeft: e && e.activeLabel ? e.activeLabel : "",
            }));
          }}
          onMouseMove={(e) => {
            // console.log(e);
            if (!e || !e.activePayload) {
              setMarker(undefined);
              return;
            }

            setMarker(e.activePayload[0].payload as ActivityItem);

            if (!isZoomed) {
              zoomGraph.refAreaLeft &&
                setZoomGraph((prev) => ({
                  ...prev,
                  refAreaRight: e.activeLabel ? e.activeLabel : "",
                }));
            }
          }}
          onMouseUp={() => {
            if (isZoomed) {
              return;
            }
            zoom();
          }}
          margin={{ top: 10, right: 0, left: hideAxes ? 0 : 20, bottom: 30 }}
        >
          {!hideAxes && (
            <CartesianGrid
              stroke={String(themeContext.theme.colors?.divider)}
            />
          )}

          <Tooltip
            active={false}
            cursor={<CustomCursor />}
            content={
              <></>
              // <Box
              //   sx={{
              //     display: "flex",
              //     backgroundColor: "transparent",
              //     width: "100vw",
              //     height: "100px",
              //   }}
              // ></Box>
            }
          />
          {/* <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="1" y2="0">
              <GradeGradient data={downSampledData} xMax={xMax} />
            </linearGradient>
          </defs> */}
          {!hideAxes && (
            <XAxis
              allowDataOverflow
              dataKey="d"
              type="number"
              domain={left && right ? [left, right] : undefined}
              // ticks={calcTicks()}
              // domain={[0, xMax]}
              tickCount={5}
              // interval={0}
              label={{
                value: `Distance (${units.distanceUnit})`,
                position: "bottom",
                fontSize: "14px",
              }}
              allowDecimals={false}
              // tickFormatter={(t) => {
              //   return t;
              // }}
              tickFormatter={(t) => t.toFixed(1)}
              tick={{
                fill: themeContext?.theme?.colors?.text as string,
                fontSize: "14px",
              }}
              hide={hideAxes}
              stroke={themeContext?.theme?.colors?.chartAxes as string}
            />
          )}
          {!hideAxes && (
            <YAxis
              allowDataOverflow
              domain={[bottom2, top2]}
              type="number"
              label={{
                value: `Elevation (${units.elevationUnit})`,
                angle: -90,
                position: "left",
                fontSize: "14px",
              }}
              allowDecimals={false}
              dataKey="e"
              tick={{
                fill: themeContext?.theme?.colors?.text as string,
                fontSize: "14px",
              }}
              tickFormatter={(t) => t.toFixed(1)}
              stroke={themeContext?.theme?.colors?.chartAxes as string}
              hide={hideAxes}
            />
          )}
          <Area
            type={"monotone"}
            dataKey="e"
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
