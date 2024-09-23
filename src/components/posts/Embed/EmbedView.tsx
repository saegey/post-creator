import { Box } from "theme-ui";
import React from "react";

import { useUnits } from "../../UnitProvider";
import { EmbedElementType } from "../../../types/common";
import EmbedBase from "./EmbedBase";

const EmbedView = ({ element }: { element: EmbedElementType }) => {
  const { unitOfMeasure } = useUnits();

  const url = `${element.url}{${
    unitOfMeasure === "metric" ? "&metricUnits=true" : ""
  }}`;

  const embedMemo = React.useMemo(() => {
    return (
      <Box
        sx={{
          position: "relative",
          width: ["100%", "690px", "690px"],
          marginX: "auto",
          marginY: "20px",
        }}
      >
        <EmbedBase url={url} />
      </Box>
    );
  }, [element]);

  return embedMemo;
};

export default EmbedView;
