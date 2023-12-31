import React from "react";

export type RaceResultsMetaType = {
  categories: {
    data: { filterValues: Array<{ Values: Array<string> }> };
  };
  category: string;
  division: string;
  key: string;
  server: string;
  eventName: string;
};

export type CrossResultsMetaType = {
  category: string;
  categories: Array<string>;
  eventName: string;
};

export type WebScorerMetaType = {
  category: string;
  categories: Array<string>;
  eventName: string;
};

export type OmniMetaType = {
  category: string;
  categories: Array<string>;
  eventName: string;
};

export type RunSignupMetaType = {
  category: number | undefined;
  categoryName: string;
  categories: Array<{
    id: number;
    category: string;
    year: number;
    name: string;
  }>;
  eventName: string;
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

  previewRunSignupResults: boolean;
  setPreviewRunSignupResults: React.Dispatch<React.SetStateAction<boolean>>;

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

  runSignupMeta: RunSignupMetaType;
  setRunSignupMeta: React.Dispatch<React.SetStateAction<RunSignupMetaType>>;
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

  previewRunSignupResults: false,
  setPreviewRunSignupResults: () => {},

  resultsUrl: "",
  setResultsUrl: () => {},
  raceResultsMeta: {
    category: "",
    categories: { data: { filterValues: [] } },
    division: "",
    key: "",
    server: "",
    eventName: "",
  },
  setRaceResultsMeta: () => {},

  webScorerMeta: {
    category: "",
    categories: [],
    eventName: "",
  },
  setWebScorerMeta: () => {},

  omniMeta: {
    category: "",
    categories: [],
    eventName: "",
  },
  setOmniMeta: () => {},

  crossResultsMeta: {
    category: "",
    categories: [],
    eventName: "",
  },
  setCrossResultsMeta: () => {},

  runSignupMeta: {
    category: undefined,
    categories: [],
    eventName: "",
    categoryName: "",
  },
  setRunSignupMeta: () => {},
});

export { ResultsContext };
