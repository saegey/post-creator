import { Box, ThemeUIStyleObject, Theme, Text, Flex } from "theme-ui";
import React from "react";

import PowerCurveGraph from "./PowerCurveGraph";
import { PostContext } from "../../PostContext";
import PowerGraphIcon from "../../icons/PowerGraphIcon";

const PowerGraphView = () => {
  const { powerAnalysis, currentFtp } = React.useContext(PostContext);

  if (powerAnalysis === undefined || powerAnalysis === null) {
    return (
      <Box
        sx={{
          position: "relative",
          width: ["100%", "690px", "690px"],
          marginX: "auto",
          marginY: "20px",
        }}
      >
        <Box variant="boxes.componentCard" contentEditable={false}>
          <Flex
            sx={
              {
                backgroundColor: "surface",
                borderRadius: "5px",
                width: "100%",
                height: ["250px", "450px", "450px"],
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                flexDirection: "column",
              } as ThemeUIStyleObject<Theme>
            }
          >
            <Flex sx={{ alignItems: "center", gap: "5px" }}>
              <PowerGraphIcon
                sx={{
                  color: "surfaceAccent",
                  width: "40px",
                  height: "40px",
                  padding: "0px",
                }}
              />
              <Text
                sx={{
                  color: "surfaceAccent",
                  fontSize: "20px",
                  fontWeight: 610,
                }}
              >
                Graph requires activity
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    );
  }

  const powerGraph = React.useMemo(() => {
    const data = Object.keys(powerAnalysis ? powerAnalysis : [])
      .map((k, _) => {
        if (Number(k) > 0) {
          return {
            x: Number(k),
            y: powerAnalysis ? powerAnalysis[k as keyof Object] : undefined,
          };
        }
      })
      .filter((p) => p !== undefined) as any;

    return (
      <PowerCurveGraph ftp={currentFtp ? Number(currentFtp) : 0} data={data} />
    );
  }, [powerAnalysis, currentFtp]);

  const graphMemo = React.useMemo(() => {
    return (
      <Box
        sx={{
          position: "relative",
          width: ["100%", "690px", "690px"],
          marginX: "auto",
          marginY: "20px",
        }}
      >
        <Box variant="boxes.componentCard" contentEditable={false}>
          <Box
            sx={
              {
                width: "100%",
                height: ["250px", "450px", "450px"],
              } as ThemeUIStyleObject<Theme>
            }
          >
            {powerGraph}
          </Box>
        </Box>
      </Box>
    );
  }, [powerAnalysis, currentFtp]);

  return graphMemo;
};

export default PowerGraphView;
