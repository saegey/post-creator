import { Flex, Box, Label, Input, Button, Text, Spinner } from "theme-ui";
import React from "react";

import {
  getCategories,
  getCrossResultsCategories,
  getOmniResultsCategories,
  getWebScorerCategories,
} from "./api";
import { ResultsContext } from "./ResultsContext";

import OmniSubmitButton from "./OmniGo/OmniSubmitButton";
import RaceResultsSubmitButton from "./RaceResults/RaceResultsSubmitButton";
import WebscorerSelect from "./WebScorer/WebscorerSelect";
import OmniSelect from "./OmniGo/OmniSelect";
import RaceResultsSelect from "./RaceResults/RacesResultsSelect";
import WebscorerSubmitButton from "./WebScorer/WebscorerSubmitButton";
import CrossResultsSubmitButton from "./CrossResults/CrossResultsSubmitButton";
import CrossResultsSelect from "./CrossResults/CrossResultsSelect";

const RaceImportForm = () => {
  const {
    setResultsUrl,
    resultsUrl,
    setRaceResultsMeta,
    raceResultsMeta,
    webScorerMeta,
    setWebScorerMeta,
    omniMeta,
    setOmniMeta,
    crossResultsMeta,
    setCrossResultsMeta,
  } = React.useContext(ResultsContext);

  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Flex sx={{ gap: "10px", flexDirection: "row" }}>
      <form
        onSubmit={(event: any) => {
          setIsLoading(true);
          event.preventDefault();
          const form = new FormData(event.target);
          const url = form.get("url") as string;
          const domain = new URL(url);
          setResultsUrl(url);

          switch (domain.hostname) {
            // https://www.webscorer.com/race?raceid=336176
            case "www.webscorer.com":
              getWebScorerCategories({ url }).then((res) => {
                setWebScorerMeta({ ...webScorerMeta, categories: res.data });
                setIsLoading(false);
              });
              break;

            // https://my.raceresult.com/240337/results
            case "my.raceresult.com":
              getCategories({ url }).then((res) => {
                setRaceResultsMeta({
                  ...raceResultsMeta,
                  key: res.data.key,
                  server: res.data.server,
                  categories: res,
                });

                setIsLoading(false);
              });
              break;

            // https://www.crossresults.com/race/12190
            case "www.crossresults.com":
              getCrossResultsCategories({ url }).then((res) => {
                setCrossResultsMeta({
                  ...crossResultsMeta,
                  categories: Array.from(
                    new Set([...res.data.map((r) => r["RaceCategoryName"])])
                  ),
                });
                setIsLoading(false);
              });

              break;

            // https://www.omnigoevents.com/events/bwr-bc-2023/results/
            case "www.omnigoevents.com":
              getOmniResultsCategories({ url }).then((res) => {
                setOmniMeta({
                  ...omniMeta,
                  categories: res.data.eventClasses.map(
                    (r) => r["classWithPrefix"]
                  ),
                });
                setIsLoading(false);
              });

              break;

            default:
              console.log(`Sorry, we are out of shit.`);
          }
        }}
        style={{ width: "100%" }}
      >
        <Flex sx={{ gap: "20px", flexDirection: "column" }}>
          <Box sx={{ marginTop: "20px" }}>
            <Label htmlFor="url" variant="defaultLabel">
              Link to results
            </Label>
            <Input
              id="url"
              name="url"
              variant={"defaultInput"}
              readOnly={resultsUrl ? true : false}
            />
          </Box>

          {webScorerMeta.categories.length > 0 && <WebscorerSelect />}
          {crossResultsMeta.categories.length > 0 && <CrossResultsSelect />}
          {Array.from(omniMeta.categories).length > 0 && <OmniSelect />}
          {raceResultsMeta.categories.data.filterValues.length > 0 && (
            <RaceResultsSelect />
          )}

          {raceResultsMeta.categories.data.filterValues.length === 0 &&
            webScorerMeta.categories.length === 0 &&
            crossResultsMeta.categories.length === 0 &&
            Array.from(omniMeta.categories).length === 0 && (
              <Box sx={{ marginLeft: "auto" }}>
                <Button
                  disabled={isLoading ? true : false}
                  variant="primaryButton"
                  id="import-results"
                >
                  <Flex sx={{ gap: "10px" }}>
                    <Text as="span">Import</Text>
                    {isLoading && (
                      <Spinner sx={{ size: "20px", color: "spinnerButton" }} />
                    )}
                  </Flex>
                </Button>
              </Box>
            )}
          {webScorerMeta.categories.length > 0 && <WebscorerSubmitButton />}
          {crossResultsMeta.categories.length > 0 && (
            <CrossResultsSubmitButton />
          )}
          {raceResultsMeta.categories.data.filterValues.length > 0 && (
            <RaceResultsSubmitButton />
          )}
          {Array.from(omniMeta.categories).length > 0 && <OmniSubmitButton />}
        </Flex>
      </form>
    </Flex>
  );
};

export default RaceImportForm;
