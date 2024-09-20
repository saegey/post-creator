import { Box } from "theme-ui";

import VisualOverview from "./VisualOverview";
import { ActivityItem, VisualOverviewType } from "../../../types/common";

interface VisualOverviewBaseProps {
  activity: {
    g?: number | undefined;
    d: number;
    e?: number;
    c: Array<number>;
    t?: number;
    i?: number;
    p?: number;
    h?: number;
  }[];
  elevations?: ActivityItem[] | null;
  element: VisualOverviewType;
  view: boolean;
  unitOfMeasure: string;
  token: string;
}

const VisualOverviewBase: React.FC<VisualOverviewBaseProps> = (props) => {
  const { activity, elevations, element, view, unitOfMeasure, token } = props;

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "690px",
        marginX: "auto",
      }}
      contentEditable={false}
    >
      <VisualOverview
        activity={activity}
        elevations={elevations ? elevations : []}
        token={token}
        element={element}
        view={view}
        unitOfMeasure={unitOfMeasure}
      />
    </Box>
  );
};
export default VisualOverviewBase;
