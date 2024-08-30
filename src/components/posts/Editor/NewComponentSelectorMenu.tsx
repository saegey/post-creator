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
import { EditorContext } from "./EditorContext";
import AddText from "./AddText";

const GraphSelectorMenu = () => {
  const { menuPosition } = React.useContext(EditorContext);

  return (
    <>
      <Flex sx={{ flexDirection: "column", margin: "0px" }}>
        <AddText path={menuPosition.path} />
        <AddImage path={menuPosition.path} />
        <AddPowerCurve path={menuPosition.path} />
        <AddActivityOverview path={menuPosition.path} />
        {/* <AddTimeZones path={menuPosition.path} /> */}
        <AddStravaLink path={menuPosition.path} />
        <AddRWGPS path={menuPosition.path} />
        <AddRaceResults path={menuPosition.path} />
        <AddRouteOverview path={menuPosition.path} />
        <AddVideo />
      </Flex>
    </>
  );
};

export default GraphSelectorMenu;
