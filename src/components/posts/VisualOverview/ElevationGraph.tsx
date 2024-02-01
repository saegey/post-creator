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

import { ActivityItem, VisualOverviewType } from "../../../types/common";
import { useUnits } from "../../UnitProvider";

// type ActivityEvent = {
//   c: Array<number> | Array<null>;
//   g: number;
//   d: number;
//   t: number | null;
//   e: number | null;
// };

// export interface GradeGradientActivty extends ActivityEvent {
//   color: string;
// }

export interface ElevationGraphProps {
  data: Array<ActivityItem>;
  setMarker: React.Dispatch<React.SetStateAction<ActivityItem | undefined>>;
  element: VisualOverviewType;
  view: boolean;
  setSelection: React.Dispatch<
    React.SetStateAction<[number, number] | undefined>
  >;
  selection: [number, number] | undefined;
  isSaved: boolean;
  left: number | string;
  right: number | string;
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

  // console.log(top, bottom);

  const getAxisYDomain = (
    from: string | undefined,
    to: string | undefined,
    ref: keyof ActivityItem,
    offset: number
  ): (number | string)[] => {
    if (from && to) {
      const lower = data.findIndex((s) => s.d === Number(from));
      const upper = data.findIndex((s) => s.d === Number(to));
      const refData = data.slice(lower, upper);

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
      return [bottom, top + offset];
    }

    return [bottom, top];
  };

  const editor = element && !view && useSlateStatic();
  const path =
    element && !view && editor
      ? ReactEditor.findPath(editor, element)
      : undefined;
  const themeContext = useThemeUI();
  const units = useUnits();
  const hideAxes = false;

  // console.log(left.d);

  const initialState = {
    refAreaLeft: "",
    refAreaRight: "",
  };

  const [zoomGraph, setZoomGraph] = React.useState(initialState);
  // console.log(zoomGraph);

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
            display: showZoomOut ? "inherit" : "none",
          }}
          onClick={() => zoomOut()}
        >
          Zoom Out
        </Button>

        <Button
          variant="primaryButton"
          sx={{
            display: isSaved && !showSaveButton ? "inherit" : "none",
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
          // key={data[0].e}
          data={data}
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
            // console.log(e);
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
            <CartesianGrid
              stroke={String(themeContext.theme.colors?.divider)}
            />
          )}

          <Tooltip active={false} cursor={<CustomCursor />} content={<></>} />
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
              tickCount={5}
              label={{
                value: `Distance (${
                  units.unitOfMeasure === "metric" ? "km" : "mi"
                })`,
                position: "bottom",
                fontSize: "14px",
              }}
              allowDecimals={false}
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
              domain={[bottom, top]}
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
              dataKey="e"
              tick={{
                fill: themeContext?.theme?.colors?.text as string,
                fontSize: "14px",
              }}
              tickFormatter={(t) => t.toFixed(0)}
              stroke={themeContext?.theme?.colors?.chartAxes as string}
              hide={hideAxes}
            />
          )}
          <Area
            type={"linear"}
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
