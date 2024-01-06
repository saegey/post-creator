import {
  Flex,
  Box,
  Label,
  Input,
  Button,
  Text,
  Spinner,
  Message,
  Link,
} from "theme-ui";
import React, { FormEvent } from "react";

import {
  getCategories,
  getCrossResultsCategories,
  getOmniResultsCategories,
  getRunSignupCategories,
  getWebScorerCategories,
  saveRequestProvider,
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
import RunSignupSelect from "./RunSignup/RunSignupSelect";
import RunSignupSubmitButton from "./RunSignup/RunSignupSubmitButton";
import { NotificationContext } from "../../NotificationContext";

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
    runSignupMeta,
    setRunSignupMeta,
  } = React.useContext(ResultsContext);
  const { setNotification } = React.useContext(NotificationContext);

  const [isLoading, setIsLoading] = React.useState(false);
  const [requestImport, setRequestImport] = React.useState(false);
  const [importRequested, setImportRequested] = React.useState(false);
  const [invalidUrl, setInvalidUrl] = React.useState(false);
  const [requestImportLoading, setRequestImportLoading] = React.useState(false);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    setInvalidUrl(false);
    setRequestImport(false);
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const url = form.get("url") as string;
    const domain = new URL(url);
    setResultsUrl(url);

    switch (domain.hostname) {
      // https://www.webscorer.com/race?raceid=336176
      case "www.webscorer.com":
        getWebScorerCategories({ url }).then((res) => {
          setWebScorerMeta({
            ...webScorerMeta,
            categories: res.data.categories,
            eventName: res.data.name,
          });
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
            eventName: res.data.eventName,
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
            eventName: res.data[0]["RaceName"],
          });
          setIsLoading(false);
        });

        break;

      // https://www.omnigoevents.com/events/bwr-bc-2023/results/
      case "www.omnigoevents.com":
        getOmniResultsCategories({ url }).then((res) => {
          setOmniMeta({
            ...omniMeta,
            categories: res.data.eventClasses.map((r) => r["classWithPrefix"]),
            eventName: res.data.name,
          });
          setIsLoading(false);
        });

        break;

      // https://runsignup.com/Race/Results/86159
      case "runsignup.com":
        getRunSignupCategories({ url })
          .then((res) => {
            console.log(res);
            if (!res) {
              console.log("noo categoroieis");
            } else {
              setRunSignupMeta({
                ...runSignupMeta,
                categories: res.data.categories,
                eventName: res.data.eventName,
              });
            }
          })
          .catch((e) =>
            setNotification({
              message: "Failed to get race info",
              type: "Error",
            })
          )
          .then(() => {
            setIsLoading(false);
          });

        break;

      default:
        console.log(`Sorry, we don't support that url`);
        setIsLoading(false);
        setRequestImport(true);
    }
  };

  const submitImportRequest = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log(event);
    setRequestImportLoading(true);
    await saveRequestProvider({
      title: "Request results provider",
      body: JSON.stringify({ url: resultsUrl }),
    });
    setImportRequested(true);
    setRequestImportLoading(false);
  };

  return (
    <>
      {requestImport && (
        <Box sx={{ paddingY: "10px" }}>
          <Message variant="default">
            <Flex sx={{ width: "100%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Text as="div" sx={{ lineHeight: "28px", fontWeight: "600" }}>
                  We don't support this provider yet.
                </Text>
                <Text>
                  If you request it, we will notify when the results are
                  imported.
                </Text>
              </Box>

              <Flex sx={{ flexDirection: "column", justifyContent: "center" }}>
                <Button
                  sx={{
                    paddingY: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#3d3d3d",
                    },
                    "&:disabled": {
                      backgroundColor: "gray",
                      cursor: "not-allowed",
                    },
                  }}
                  disabled={
                    requestImportLoading || importRequested ? true : false
                  }
                  onClick={submitImportRequest}
                >
                  <Flex
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Text sx={{ lineHeight: "20px" }}>
                      {importRequested ? "Requested" : "Request Import"}
                    </Text>
                    <Spinner
                      sx={{
                        width: "20px",
                        height: "20px",
                        color: "white",
                        display: requestImportLoading ? "inherit" : "none",
                      }}
                    />
                  </Flex>
                </Button>
              </Flex>
            </Flex>
          </Message>
        </Box>
      )}
      <Flex sx={{ gap: "10px", flexDirection: "row" }}>
        <form
          onSubmit={(event) => {
            try {
              submitForm(event);
            } catch (err: unknown) {
              console.log(err);
              if (err instanceof TypeError) {
                console.log(err.message);
                setInvalidUrl(true);
                setIsLoading(false);
              }
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
                defaultValue={resultsUrl ? resultsUrl : ""}
                autoFocus
                onFocus={(e) => e.currentTarget.select()}
                variant={invalidUrl ? "errorInput" : "defaultInput"}
                readOnly={resultsUrl && !requestImport ? true : false}
              />
              {invalidUrl && (
                <Text as="span" variant="error">
                  Invalid Url
                </Text>
              )}
            </Box>

            {webScorerMeta.categories.length > 0 && <WebscorerSelect />}
            {crossResultsMeta.categories.length > 0 && <CrossResultsSelect />}
            {Array.from(omniMeta.categories).length > 0 && <OmniSelect />}
            {raceResultsMeta.categories.data.filterValues.length > 0 && (
              <RaceResultsSelect />
            )}
            {runSignupMeta.categories.length > 0 && <RunSignupSelect />}

            {raceResultsMeta.categories.data.filterValues.length === 0 &&
              webScorerMeta.categories.length === 0 &&
              crossResultsMeta.categories.length === 0 &&
              Array.from(omniMeta.categories).length === 0 &&
              runSignupMeta.categories.length === 0 && (
                <Box sx={{ marginLeft: "auto" }}>
                  <Button
                    disabled={isLoading ? true : false}
                    variant="primaryButton"
                    id="import-results"
                  >
                    <Flex sx={{ gap: "10px" }}>
                      <Text as="span">Import</Text>
                      {isLoading && (
                        <Spinner
                          sx={{ size: "20px", color: "spinnerButton" }}
                        />
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
            {runSignupMeta.categories.length > 0 && <RunSignupSubmitButton />}
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default RaceImportForm;
