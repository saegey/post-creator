import React from "react";

export type VisualOverviewContextType = {
  selection: [number, number] | undefined;
  setSelection: React.Dispatch<
    React.SetStateAction<[number, number] | undefined>
  >;
  isSaved: boolean;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
};

const VisualOverviewContext = React.createContext<VisualOverviewContextType>({
  selection: undefined,
  setSelection: () => {},
  isSaved: false,
  setIsSaved: () => {},
});

export { VisualOverviewContext };
