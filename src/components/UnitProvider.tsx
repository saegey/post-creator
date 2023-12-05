import React from "react";

const defaultState = {
  unitOfMeasure: "imperial",
  toggleUnit: () => {},
};

const unitContext = React.createContext(defaultState);

export default unitContext;

const useUnits = () => {
  const { unitOfMeasure, toggleUnit } =
    React.useContext(unitContext);
  return { unitOfMeasure, toggleUnit };
};

export { useUnits };
