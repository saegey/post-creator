import React from "react";
import { Box, Flex } from "theme-ui";
import VisualOverview from "./VisualOverview";
import { PostContext } from "../../PostContext";

const VisualOverviewViewWrapper = () => {
  const { activity, id } = React.useContext(PostContext);

  return (
    <Flex
      sx={{ marginX: [null, "120px", "120px"] }}
      key={`{visualoverview-${id}}`}
    >
      <Box sx={{ width: "900px", maxWidth: "900px", marginX: "auto" }}>
        <VisualOverview
          activity={activity ? activity : undefined}
          token={
            "pk.eyJ1Ijoic2FlZ2V5IiwiYSI6ImNsYmU1amxuYTA3emEzbm81anNmdXo4YnIifQ.uxutNvuagvWbw1h-RBfmPg"
          }
        />
      </Box>
    </Flex>
  );
};

export default VisualOverviewViewWrapper;
