import React from "react";
import { Box, Spinner, Flex, ThemeUIStyleObject, Theme } from "theme-ui";

import { PostContext } from "../../PostContext";
import { VisualOverviewType } from "../../../types/common";
import VisualOverviewBase from "./VisualOverviewBase";

const VisualOverviewView = ({
  element,
  view,
  unitOfMeasure,
}: {
  element: VisualOverviewType;
  view: boolean;
  unitOfMeasure: string;
}) => {
  const { activity, elevations } = React.useContext(PostContext);

  const renderMap = React.useMemo(() => {
    const formatted =
      activity?.map((a) => {
        return {
          ...a,
          g: a.g !== null ? a.g : 0,
          d:
            unitOfMeasure === "imperial"
              ? a && a.d
                ? Number((a.d * 0.00062137121212121).toFixed(5))
                : 0
              : a && a.d
              ? Number((a?.d / 1000).toFixed(5))
              : 0,
          e: unitOfMeasure === "metric" ? a.e : a && a.e ? a.e * 3.28084 : 0,
        };
      }) || [];

    return (
      <VisualOverviewBase
        activity={formatted}
        elevations={elevations ? elevations : []}
        token={
          "pk.eyJ1Ijoic2FlZ2V5IiwiYSI6ImNsYmU1amxuYTA3emEzbm81anNmdXo4YnIifQ.uxutNvuagvWbw1h-RBfmPg"
        }
        element={element}
        view={view}
        unitOfMeasure={unitOfMeasure}
      />
    );
  }, [activity, elevations, unitOfMeasure]);

  if (!activity || activity.length === 0 || !unitOfMeasure) {
    return (
      <Flex
        sx={
          {
            width: "900px",
            marginX: "auto",
            backgroundColor: "border",
            borderRadius: "5px",
          } as ThemeUIStyleObject<Theme>
        }
      >
        <Spinner sx={{ margin: "auto" } as ThemeUIStyleObject<Theme>} />
      </Flex>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: ["100%", "690px", "690px"],
        marginX: "auto",
        marginY: "20px",
      }}
    >
      {renderMap}
    </Box>
  );
};

export default VisualOverviewView;
