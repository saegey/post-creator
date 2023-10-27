import React from "react";
import { Box, Spinner } from "theme-ui";
import { PowerCurveGraph } from "../../src/components/PowerCurveGraph";
import { PostContext } from "./PostContext";

const PowerGraphViewWrapper = () => {
  const { powerAnalysis, id, currentFtp } = React.useContext(PostContext);

  if (!powerAnalysis) {
    return (
      <Box key={`{powergraph-${id}}`}>
        <Spinner />
      </Box>
    );
  }
  const graphData = Object.keys(powerAnalysis)
    .map((k, i) => {
      if (Number(k) > 0) {
        return {
          x: Number(k),
          y: powerAnalysis ? powerAnalysis[k as keyof Object] : 0,
        };
      }
    })
    .filter((p) => p !== undefined);

  return (
    <Box
      sx={{
        maxWidth: "690px",
        width: "100%",
        marginX: "auto",
        height: ["300px", "450px", "450px"],
        marginY: ["30px", "60px", "60px"],
        backgroundColor: [
          null,
          "activityOverviewBackgroundColor",
          "activityOverviewBackgroundColor",
        ],
        paddingY: "10px",
        borderRadius: "5px",
      }}
      key={`{powergraph-${id}}`}
    >
      <PowerCurveGraph
        ftp={currentFtp ? Number(currentFtp) : 0}
        data={graphData as any}
      />
    </Box>
  );
};

export default PowerGraphViewWrapper;
