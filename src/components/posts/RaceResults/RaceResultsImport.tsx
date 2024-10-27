import { Text } from "theme-ui";
import React from "react";

import { EditorContext } from "../Editor/EditorContext";
import RaceResultsPreview from "./RaceResults/RaceResultsPreview";
import WebscorerResultsPreview from "./WebScorer/WebscorerResultsPreview";
import StandardModal from "../../shared/StandardModal";
import CrossResultsPreview from "./CrossResults/CrossResultsPreview";
import OmniResultsPreview from "./OmniGo/OmniResultsPreview";
import RaceImportForm from "./RaceImportForm";
import {
  CrossResultsMetaType,
  OmniMetaType,
  RaceResultsMetaType,
  ResultsContext,
  RunSignupMetaType,
  WebScorerMetaType,
} from "./ResultsContext";
import RunSignUpResultsPreview from "./RunSignup/RunSignupResultsPreview";
import { useSlateContext } from "../../SlateContext";

const RaceResultsImport = () => {
  const [previewResults, setPreviewResults] = React.useState(false);
  const [previewWebscorerResults, setPreviewWebscorerResults] =
    React.useState(false);
  const [previewCrossResults, setPreviewCrossResults] = React.useState(false);
  const [previewOmniResults, setPreviewOmniResults] = React.useState(false);
  const [previewRunSignupResults, setPreviewRunSignupResults] =
    React.useState(false);
  const { editor } = useSlateContext();

  if (!editor) {
    return;
  }

  const [resultsUrl, setResultsUrl] = React.useState<string>("");

  const [raceResultsMeta, setRaceResultsMeta] =
    React.useState<RaceResultsMetaType>({
      category: "",
      categories: { data: { filterValues: [] } },
      division: "",
      key: "",
      server: "",
      eventName: "",
    });

  const [webScorerMeta, setWebScorerMeta] = React.useState<WebScorerMetaType>({
    category: "",
    categories: [],
    eventName: "",
  });

  const [crossResultsMeta, setCrossResultsMeta] =
    React.useState<CrossResultsMetaType>({
      category: "",
      categories: [],
      eventName: "",
    });

  const [omniMeta, setOmniMeta] = React.useState<OmniMetaType>({
    category: "",
    categories: [],
    eventName: "",
  });

  const [runSignupMeta, setRunSignupMeta] = React.useState<RunSignupMetaType>({
    category: undefined,
    categories: [],
    eventName: "",
    categoryName: "",
  });

  const { isRaceResultsModalOpen, setIsRaceResultsModalOpen, menuPosition } =
    React.useContext(EditorContext);
  const { path } = menuPosition;

  const isPreview = () => {
    return (
      previewResults ||
      previewWebscorerResults ||
      previewCrossResults ||
      previewOmniResults ||
      previewRunSignupResults
    );
  };

  const notPreview = () => {
    return (
      !previewResults &&
      !previewWebscorerResults &&
      !previewCrossResults &&
      !previewOmniResults &&
      !previewRunSignupResults
    );
  };

  return (
    <>
      <StandardModal
        title={"Race Results"}
        setIsOpen={setIsRaceResultsModalOpen}
        isOpen={isRaceResultsModalOpen}
      >
        <ResultsContext.Provider
          value={{
            previewResults,
            setPreviewResults,
            previewWebscorerResults,
            setPreviewWebscorerResults,
            previewCrossResults,
            setPreviewCrossResults,
            previewOmniResults,
            setPreviewOmniResults,
            resultsUrl,
            setResultsUrl,
            raceResultsMeta,
            setRaceResultsMeta,
            webScorerMeta,
            setWebScorerMeta,
            crossResultsMeta,
            setCrossResultsMeta,
            omniMeta,
            setOmniMeta,
            runSignupMeta,
            setRunSignupMeta,
            previewRunSignupResults,
            setPreviewRunSignupResults,
          }}
        >
          {isPreview() && (
            <Text as="div" sx={{ marginY: "5px" }}>
              Select your result below:
            </Text>
          )}

          {previewResults && <RaceResultsPreview path={path} />}
          {previewWebscorerResults && (
            <WebscorerResultsPreview editor={editor} path={path} />
          )}
          {previewCrossResults && <CrossResultsPreview editor={editor} />}
          {previewOmniResults && <OmniResultsPreview editor={editor} />}
          {previewRunSignupResults && (
            <RunSignUpResultsPreview editor={editor} />
          )}

          {notPreview() && <RaceImportForm />}
        </ResultsContext.Provider>
      </StandardModal>
    </>
  );
};

export default RaceResultsImport;
