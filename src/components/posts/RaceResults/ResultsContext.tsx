import React from "react";

export type RaceResultsMetaType = {
  categories: {
    data: { filterValues: Array<{ Values: Array<string> }> };
  };
  category: string;
  division: string;
  key: string;
  server: string;
};

export type CrossResultsMetaType = {
  category: string;
  categories: Array<string>;
};

export type WebScorerMetaType = {
  category: string;
  categories: Array<string>;
};

export type OmniMetaType = {
  category: string;
  categories: Array<string>;
};

export type ResultsContextType = {
  previewResults: boolean;
  setPreviewResults: React.Dispatch<React.SetStateAction<boolean>>;

  previewWebscorerResults: boolean;
  setPreviewWebscorerResults: React.Dispatch<React.SetStateAction<boolean>>;

  previewCrossResults: boolean;
  setPreviewCrossResults: React.Dispatch<React.SetStateAction<boolean>>;

  previewOmniResults: boolean;
  setPreviewOmniResults: React.Dispatch<React.SetStateAction<boolean>>;

  resultsUrl: string;
  setResultsUrl: React.Dispatch<React.SetStateAction<string>>;

  raceResultsMeta: RaceResultsMetaType;
  setRaceResultsMeta: React.Dispatch<React.SetStateAction<RaceResultsMetaType>>;

  webScorerMeta: WebScorerMetaType;
  setWebScorerMeta: React.Dispatch<React.SetStateAction<WebScorerMetaType>>;

  omniMeta: OmniMetaType;
  setOmniMeta: React.Dispatch<React.SetStateAction<OmniMetaType>>;

  crossResultsMeta: CrossResultsMetaType;
  setCrossResultsMeta: React.Dispatch<
    React.SetStateAction<CrossResultsMetaType>
  >;

  // omniGoResults: OmniGoResultsType;
  // setOmniGoResults: React.Dispatch<React.SetStateAction<OmniGoResultsType>>;
};

const ResultsContext = React.createContext<ResultsContextType>({
  previewResults: false,
  setPreviewResults: () => {},
  previewWebscorerResults: false,
  setPreviewWebscorerResults: () => {},
  previewCrossResults: false,
  setPreviewCrossResults: () => {},
  previewOmniResults: false,
  setPreviewOmniResults: () => {},
  resultsUrl: "",
  setResultsUrl: () => {},
  raceResultsMeta: {
    category: "",
    categories: { data: { filterValues: [] } },
    division: "",
    key: "",
    server: "",
  },
  setRaceResultsMeta: () => {},
  webScorerMeta: {
    category: "",
    categories: [],
  },
  omniMeta: {
    category: "",
    categories: [],
  },
  setOmniMeta: () => {},
  setWebScorerMeta: () => {},
  crossResultsMeta: {
    category: "",
    categories: [],
  },
  setCrossResultsMeta: () => {},
});

export { ResultsContext };
