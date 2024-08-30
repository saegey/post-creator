import React from "react";

const defaultState = {
  unitOfMeasure: "imperial",
  toggleUnit: () => {},
} as UnitContextType;

export interface UnitContextType {
  unitOfMeasure: "imperial" | "metric";
  toggleUnit: () => {};
}

const unitContext = React.createContext<UnitContextType>(defaultState);

export default unitContext;

const useUnits = () => {
  const { unitOfMeasure, toggleUnit } = React.useContext(unitContext);
  return { unitOfMeasure, toggleUnit };
};

export { useUnits };
