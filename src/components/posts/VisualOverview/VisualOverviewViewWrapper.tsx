import React from "react";
import { Box, Flex } from "theme-ui";

import VisualOverview from "./VisualOverview";
import { PostContext } from "../../PostContext";
import { VisualOverviewType } from "../../../types/common";
import { VisualOverviewContext } from "./VisualOverviewContext";
import { useUnits } from "../../UnitProvider";

const VisualOverviewViewWrapper = ({
  element,
  view,
}: {
  element: VisualOverviewType;
  view?: boolean;
}) => {
  const { activity, id } = React.useContext(PostContext);
  const [selection, setSelection] = React.useState<
    [number, number] | undefined
  >(
    element && element.selectionStart && element.selectionEnd
      ? [element.selectionStart, element.selectionEnd]
      : undefined
  );
  const [isSaved, setIsSaved] = React.useState<boolean>(
    element && element.selectionStart ? true : false
  );
  const units = useUnits();

  return (
    <Flex
      sx={{ marginX: [null, "120px", "120px"] }}
      key={`{visualoverview-${id}}`}
    >
      <Box sx={{ width: "900px", maxWidth: "900px", marginX: "auto" }}>
        <VisualOverviewContext.Provider
          value={{ selection, setSelection, isSaved, setIsSaved }}
        >
          {activity === undefined || activity.length === 0 ? (
            <Flex
              sx={{
                width: "100%",
                backgroundColor: "divider",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                margin: "60px",
                // width: "500px",
                height: "820px",
              }}
              className="skeleton"
            />
          ) : (
            <VisualOverview
              units={units}
              element={element}
              activity={activity}
              token={
                "pk.eyJ1Ijoic2FlZ2V5IiwiYSI6ImNsYmU1amxuYTA3emEzbm81anNmdXo4YnIifQ.uxutNvuagvWbw1h-RBfmPg"
              }
              view={view ? view : false}
            />
          )}
        </VisualOverviewContext.Provider>
      </Box>
    </Flex>
  );
};

export default VisualOverviewViewWrapper;
