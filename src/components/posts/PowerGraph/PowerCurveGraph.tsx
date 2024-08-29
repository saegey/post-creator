// components/PowerCurveGraph/PowerCurveGraph.tsx

import React from "react";
import PowerCurveChart from "./PowerCurveChart";
import { PowerCurveGraphProps } from "./types";

const PowerCurveGraph: React.FC<PowerCurveGraphProps> = ({ data, ftp }) => {
  return <PowerCurveChart data={data} ftp={ftp} />;
};

export default PowerCurveGraph;
