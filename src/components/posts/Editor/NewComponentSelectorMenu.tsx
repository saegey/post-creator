import { Flex } from "theme-ui";
import React from "react";

import AddPowerCurve from "./AddPowerCurve";
import AddActivityOverview from "./AddActivityOverview";
import AddVideo from "./AddVideo";
import AddRaceResults from "./AddRaceResults";
import AddRWGPS from "./AddRWGPS";
import AddRouteOverview from "./AddRouteOverview";
import AddImage from "./AddImage";
import AddText from "./AddText";

const GraphSelectorMenu = () => {
  return (
    <>
      <Flex
        sx={{
          flexDirection: "column",
          margin: "0px",
          width: "100%",
          gap: "5px",
        }}
      >
        <AddText />
        <AddImage />
        <AddVideo />
        <AddRWGPS />
        <AddRaceResults />
        <AddPowerCurve />
        <AddActivityOverview />
        <AddRouteOverview />
        {/* <AddStravaLink /> */}
      </Flex>
    </>
  );
};

export default GraphSelectorMenu;
