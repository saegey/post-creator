import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import { Box, Button, Flex, Spinner, useThemeUI } from "theme-ui";
import React from "react";
import { useSlateStatic, ReactEditor } from "slate-react";
import { Transforms } from "slate";

import { useViewport } from "../../ViewportProvider";
import GradeGradient from "./GradeGradient";
import { useUnits } from "../../UnitProvider";
import {
  ActivityItem,
  ActivityOverviewType,
  VisualOverviewType,
} from "../../../types/common";

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
  // grade: number;
}

interface NewLineGraphProps {
  downSampledData: Array<GradeGradientActivty>;
  setMarker: React.Dispatch<React.SetStateAction<ActivityItem | undefined>>;
  element: VisualOverviewType;
}

const ElevationGraph = ({
  downSampledData,
  setMarker,
  selection,
  setSelection,
  downsampleRate,
  // setDownsampleRate,
  element,
}: NewLineGraphProps) => {
  if (!downSampledData || downSampledData.length === 0) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }
  console.log(downSampledData);

  const editor = element && useSlateStatic();
  const path = element && ReactEditor.findPath(editor, element);
  console.log("path", path);
  const themeContext = useThemeUI();
  // const { width, height } = useViewport();
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
    data: shrunkData,
    left: element && element.left ? element.left : "dataMin",
    right: element && element.right ? element.right : "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top2: element && element.top ? element.top : "dataMax+20",
    bottom2: element && element.bottom ? element.bottom : "dataMin-20",
    animation: true,
  };
  console.log(initialState, downsampleRate);

  const saveState = () => {
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
        // This path references the editor, and is expanded to a range that
        // will encompass all the content of the editor.
        at: path,
      }
    );
  };

  const clearSelection = () => {
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
        // This path references the editor, and is expanded to a range that
        // will encompass all the content of the editor.
        at: path,
      }
    );
    setZoomGraph((prev) => ({
      ...prev,
      // data: data?.slice(),
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
    // const { data } = zoomGraph;
    setZoomGraph((prev) => ({
      ...prev,
      // data: data?.slice(),
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

  const getAxisYDomain = (
    from: string | undefined,
    to: string | undefined,
    ref: keyof any,
    offset: number
  ): (number | string)[] => {
    if (from && to) {
      const lower = shrunkData.findIndex((s) => s.d === Number(from));
      const upper = shrunkData.findIndex((s) => s.d === Number(to));
      const refData = shrunkData.slice(lower, upper);
      console.log(shrunkData, refData, from, to);
      let [bottom, top] = [refData[0][ref], refData[0][ref]];
      refData.forEach((d) => {
        if (d[ref] > top) top = d[ref];
        if (d[ref] < bottom) bottom = d[ref];
      });
      return [(bottom | 0) - offset, (top | 0) + offset];
    }

    return [initialState.bottom, initialState.top];
  };

  const [zoomGraph, setZoomGraph] = React.useState(initialState);

  const zoom = () => {
    let { refAreaLeft, refAreaRight } = zoomGraph;

    // const { data } = zoomGraph;
    // console.log(refAreaLeft, refAreaRight, data);

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setZoomGraph((prev) => ({
        ...prev,
        refAreaLeft: "",
        refAreaRight: "",
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft && refAreaRight && refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    // const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, "d", 1);
    const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, "e", 50);
    console.log(refAreaLeft, refAreaRight);
    setZoomGraph(
      (prev) =>
        ({
          ...prev,
          refAreaLeft: "",
          refAreaRight: "",
          // data: data?.slice(),
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
        } as any)
    );
    const lowBound = downSampledData.findIndex(
      (d) => Number(d.d) === Number(refAreaLeft)
    );
    const highBound = downSampledData.findIndex((d) => {
      // console.log(d.d, top2);
      return Number(d.d) === Number(refAreaRight);
    });
    setSelection([lowBound, highBound]);
    console.log(downSampledData[100], lowBound, highBound);
  };

  const {
    data,
    left,
    right,
    refAreaLeft,
    refAreaRight,
    // top,
    // bottom,
    top2,
    bottom2,
  } = zoomGraph;

  return (
    <Box
      sx={{
        width: "100%",
        height: ["150px", "200px", "300px"],
        borderWidth: "1px",
        // paddingY: [0, '20px', '20px'],
        paddingX: 0,
        userSelect: "none",
        // touchAction: "pan-x",
      }}
    >
      <Flex sx={{ gap: "20px" }}>
        <Button
          sx={{
            visibility:
              selection || (element && element.left) ? "visible" : "hidden",
          }}
          onClick={() => zoomOut()}
        >
          Zoom Out
        </Button>

        <Button
          sx={{ visibility: element && element.left ? "visible" : "hidden" }}
          onClick={() => clearSelection()}
        >
          Clear Selection
        </Button>
        <Button
          sx={{ visibility: selection ? "visible" : "hidden" }}
          onClick={() => saveState()}
        >
          Save State
        </Button>
      </Flex>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          onMouseDown={(e) => {
            setZoomGraph((prev) => ({
              ...prev,
              refAreaLeft: e && e.activeLabel,
            }));
            // console.log(zoomGraph);
          }}
          onMouseMove={(e) => {
            if (!e || !e.activePayload) {
              setMarker(undefined);
              return;
            }

            setMarker(e.activePayload[0].payload as ActivityItem);
            zoomGraph.refAreaLeft &&
              setZoomGraph((prev) => ({
                ...prev,
                refAreaRight: e.activeLabel,
              }));
            // console.log(zoomGraph);
          }}
          onMouseUp={() => zoom()}
          margin={{ top: 10, right: 0, left: hideAxes ? 0 : 20, bottom: 30 }}
        >
          {!hideAxes && (
            <CartesianGrid
              stroke={String(themeContext.theme.colors?.divider)}
            />
          )}

          <Tooltip
            content={
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "transparent",
                  width: "100vw",
                  height: "100px",
                }}
              ></Box>
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
            fill="black"
            fillOpacity={0.2}
            dot={false}
            stroke="black"
            strokeOpacity={0.2}
            isAnimationActive={false}
            // yAxisId="1"
          />
          {refAreaLeft && refAreaRight ? (
            <ReferenceArea
              // yAxisId="1"
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={1}
              fill="black"
            />
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ElevationGraph;
