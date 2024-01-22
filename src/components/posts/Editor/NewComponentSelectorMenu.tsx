import { Flex } from "theme-ui";
import React from "react";

import AddPowerCurve from "./PowerCurve";
import AddStravaLink from "./AddStravaLink";
import AddActivityOverview from "./AddActivityOverview";
import AddTimeZones from "./AddTimeZones";
import AddVideo from "./AddVideo";
import AddRaceResults from "./AddRaceResults";
import AddRWGPS from "./AddRWGPS";
import AddRouteOverview from "./AddRouteOverview";
import AddImage from "./AddImage";

const GraphSelectorMenu = ({ size }: { size?: "small" }) => {
  return (
    <>
      <Flex sx={{ flexDirection: "column", margin: "0px" }}>
        <AddImage />
        <AddPowerCurve size={"small"} />
        <AddActivityOverview />
        <AddTimeZones />
        <AddStravaLink />
        <AddRWGPS />
        <AddRaceResults />
        <AddRouteOverview />
        <AddVideo />
      </Flex>
    </>
  );
};

export default GraphSelectorMenu;
