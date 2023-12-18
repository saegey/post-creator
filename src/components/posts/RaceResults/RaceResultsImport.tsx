import {
  Flex,
  Box,
  Label,
  Input,
  Button,
  Text,
  Select,
  Spinner,
} from "theme-ui";
import { API } from "aws-amplify";
import React from "react";

import {
  CrossResultsPreviewRowType,
  CrossResultsPreviewType,
  PostContext,
} from "../../PostContext";
import { EditorContext } from "../Editor/EditorContext";
import RaceResultsPreview from "./RaceResultsPreview";
import WebscorerResultsPreview from "./WebscorerResultsPreview";
import StandardModal from "../../shared/StandardModal";
import { CustomEditor } from "../../../types/common";
import CrossResultsPreview from "./CrossResultsPreview";
import OmniResultsPreview from "./OmniResultsPreview";

export type WebscorerResultsRow = {
  Place: string;
  Bib: string;
  Name: string;
  FirstName: string;
  LastName: string;
  TeamName: string;
  Category: string;
  Age: number;
  YearOfBirth: number;
  Gender: string;
  Time: string;
  LapTimes: Array<{
    LapNumber: number;
    LapTime: string;
    LapRank: number;
    LapBehind: string;
    RaceTime: string;
    RaceRank: number;
    RaceBehind: string;
  }>;
  Difference: string;
  PercentBack: string;
  PercentWinning: string;
  PercentAverage: string;
  PercentMedian: string;
  CompletedLaps: number;
  StartTime: string;
};

type ResultsRow = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

type ApiRes = {
  data: { data: ResultsRow[]; list: { Fields: Array<{ Label: string }> } };
};

type WebscorerRes = {
  data: Array<WebscorerResultsRow>;
};

const RaceResultsImport = ({ editor }: { editor: CustomEditor }) => {
  const [categories, setCategories] = React.useState<{
    data: { filterValues: Array<{ Values: Array<string> }> };
  }>();
  const [category, setCategory] = React.useState("");
  const [webscorerCategory, setWebscorerCategory] = React.useState("");
  const [crossResultsCategory, setCrossResultsCategory] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [webscorerCategories, setWebscorerCategeries] =
    React.useState<Array<string> | null>(null);
  const [crossResultsCategories, setCrossResultsCategories] =
    React.useState<Set<string> | null>();

  const [omniCategories, setOmniCategories] =
    React.useState<Array<string> | null>();
  const [omniCategory, setOmniCategory] = React.useState("");

  const [raceId, setRaceId] = React.useState<string | null>();
  const [key, setKey] = React.useState();
  const [server, setServer] = React.useState();

  const [previewResults, setPreviewResults] = React.useState(false);
  const [previewWebscorerResults, setPreviewWebscorerResults] =
    React.useState(false);
  const [previewCrossResults, setPreviewCrossResults] = React.useState(false);
  const [previewOmniResults, setPreviewOmniResults] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const { isRaceResultsModalOpen, setIsRaceResultsModalOpen } =
    React.useContext(EditorContext);

  const { setRaceResults, setWebscorerResultPreview } =
    React.useContext(PostContext);

  const { setCrossResults } = React.useContext(PostContext);
  const { setOmniResults } = React.useContext(PostContext);

  const getOmniResults = async () => {
    if (raceId === undefined || raceId === null) {
      throw Error("no race id provided");
    }
    console.log(omniCategory, raceId);
    const url = `/results/omnigo/cat-results?url=${encodeURIComponent(
      raceId
    )}&category=${encodeURIComponent(omniCategory)}`;

    const res = (await API.get("api12660653", url, {
      response: true,
    })) as ApiRes;
    return res.data;
  };

  const getResults = async () => {
    if (!category || !division) {
      throw new Error("No category or division for results");
    }
    const url = `/raceresult/results?category=${encodeURIComponent(
      category
    )}&division=${encodeURIComponent(
      division
    )}&raceId=${raceId}&key=${key}&server=${server}`;

    const res = (await API.get("api12660653", url, {
      response: true,
    })) as ApiRes;

    const fields = res.data.list.Fields.map((f: { Label: string }) => f.Label);

    return res.data.data.map((d) => {
      // console.log(d);
      // [
      //   "150",
      //   "53",
      //   "Benjamin Philbrick",
      //   "39",
      //   "M",
      //   "6:09:39",
      //   "8.1 mph",
      //   "107",
      //   "126",
      //   "150",
      // ];
      const temp: Record<string, string> = {};

      d.map((column, i) => {
        const key = (
          fields[i - 1] ? fields[i - 1].replace(/\s+/g, "") : "missing"
        ) as string;
        temp[key] = column;
      });
      console.log(temp);
      return temp;
    });
  };

  const getWebscorerResults = async () => {
    // if (!category || !division) {
    //   throw new Error("No category or division for results");
    // }
    const url = `/results/webscorer/cat-results?raceId=${raceId}&category=${encodeURIComponent(
      webscorerCategory
    )}`;

    const res = (await API.get("api12660653", url, {
      response: true,
    })) as WebscorerRes;

    return res.data;
  };

  const getCrossResults = async () => {
    const url = `/results/crossresults?raceId=${raceId}`;

    const res = (await API.get("api12660653", url, {
      response: true,
    })) as { data: Array<CrossResultsPreviewRowType> };

    return res.data;
  };

  const getOmniResultsCategories = async ({ url }: { url: string }) => {
    const apiUrl = `/results/omnigo?url=${url}`;

    const res = (await API.get("api12660653", apiUrl, {
      response: true,
    })) as { data: { eventClasses: Array<{ classWithPrefix: string }> } };
    setRaceId(url);

    setOmniCategories(res.data.eventClasses.map((r) => r["classWithPrefix"]));
  };

  const getCrossResultsCategories = async ({ url }: { url: string }) => {
    // https://www.crossresults.com/race/12190#cat175293
    const resultsUrl = new URL(url);
    console.log(resultsUrl.pathname.split("/")[2]);
    const raceId = resultsUrl.pathname.split("/")[2];
    setRaceId(raceId);

    const path = `/results/crossresults?raceId=${raceId}`;
    const response = (await API.get("api12660653", path, {
      response: true,
    })) as { data: Array<CrossResultsPreviewRowType> };
    setCrossResultsCategories(
      new Set([...response.data.map((r) => r["RaceCategoryName"])])
    );
  };

  const getCategories = async ({ url }: { url: string }) => {
    const resultsUrl = new URL(url);
    setRaceId(resultsUrl.pathname.split("/")[1]);

    const apiName = "api12660653";
    const path = `/raceresult?raceId=${resultsUrl.pathname.split("/")[1]}`;
    const myInit = {
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    };
    console.log(apiName, path);
    const response = await API.get(apiName, path, myInit);
    setKey(response.data.key);
    setServer(response.data.server);
    console.log(response);
    setCategories(response);
    return response;
  };

  const getWebScorerCategories = async ({ url }: { url: string }) => {
    const paramsRaw = `?${url.split("?")[1]}`;
    const searchParams = new URLSearchParams(paramsRaw);
    const apiName = "api12660653";
    const path = `/results/webscorer?raceId=${searchParams.get("raceid")}`;

    setRaceId(searchParams.get("raceid"));

    const response = await API.get(apiName, path, { response: true });
    setWebscorerCategeries(response.data);
    return response;
  };

  return (
    <>
      <StandardModal
        title={"Race Results"}
        setIsOpen={setIsRaceResultsModalOpen}
        isOpen={isRaceResultsModalOpen}
      >
        {(previewResults ||
          previewWebscorerResults ||
          previewCrossResults ||
          previewOmniResults) && (
          <Text as="div" sx={{ marginY: "5px" }}>
            Select your result below:
          </Text>
        )}

        {previewResults && <RaceResultsPreview editor={editor} />}
        {previewWebscorerResults && <WebscorerResultsPreview editor={editor} />}
        {previewCrossResults && <CrossResultsPreview editor={editor} />}
        {previewOmniResults && <OmniResultsPreview editor={editor} />}

        {!previewResults &&
          !previewWebscorerResults &&
          !previewCrossResults &&
          !previewOmniResults && (
            <Flex sx={{ gap: "10px", flexDirection: "row" }}>
              <form
                onSubmit={(event: any) => {
                  // http://my.raceresult.com/262579/results
                  // https://www.webscorer.com/racedetails?raceid=335949&did=422618&cid=2089650
                  setIsLoading(true);
                  event.preventDefault();
                  const form = new FormData(event.target);
                  const url = form.get("url") as string;
                  const domain = new URL(url);

                  switch (domain.hostname) {
                    case "www.webscorer.com":
                      getWebScorerCategories({ url }).then(() => {
                        setIsLoading(false);
                      });
                      break;
                    case "my.raceresult.com":
                      getCategories({ url }).then(() => setIsLoading(false));
                      break;
                    case "www.crossresults.com":
                      getCrossResultsCategories({ url }).then(() => {
                        setIsLoading(false);
                      });
                      console.log("cross results");
                      break;
                    case "www.omnigoevents.com":
                      console.log("omni");
                      getOmniResultsCategories({ url }).then(() => {
                        setIsLoading(false);
                      });

                    // default:
                    //   console.log(`Sorry, we are out of shit.`);
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
                      readOnly={raceId ? true : false}
                    />
                  </Box>
                  {webscorerCategories && (
                    <>
                      <Box>
                        <Label htmlFor="url" variant="defaultLabel">
                          Category
                        </Label>
                        <Select
                          id="category"
                          variant={"defaultInput"}
                          onChange={(e) => {
                            setWebscorerCategory(e.target.value);
                          }}
                        >
                          <option></option>
                          {webscorerCategories.map((c: string, i: number) => (
                            <option key={`category-${i}`}>{c}</option>
                          ))}
                        </Select>
                      </Box>
                    </>
                  )}
                  {crossResultsCategories && (
                    <>
                      <Box>
                        <Label htmlFor="url" variant="defaultLabel">
                          Category
                        </Label>
                        <Select
                          id="category"
                          variant={"defaultInput"}
                          onChange={(e) => {
                            setCrossResultsCategory(e.target.value);
                          }}
                        >
                          <option></option>
                          {Array.from(crossResultsCategories).map(
                            (c: string, i: number) => (
                              <option key={`category-${i}`}>{c}</option>
                            )
                          )}
                        </Select>
                      </Box>
                    </>
                  )}
                  {omniCategories && (
                    <>
                      <Box>
                        <Label htmlFor="url" variant="defaultLabel">
                          Category
                        </Label>
                        <Select
                          id="category"
                          variant={"defaultInput"}
                          onChange={(e) => {
                            setOmniCategory(e.target.value);
                          }}
                        >
                          <option></option>
                          {omniCategories.map((c: string, i: number) => (
                            <option key={`category-${i}`}>{c}</option>
                          ))}
                        </Select>
                      </Box>
                    </>
                  )}
                  {categories && (
                    <>
                      <Box>
                        <Label htmlFor="url" variant="defaultLabel">
                          Category
                        </Label>
                        <Select
                          id="category"
                          variant={"defaultInput"}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                        >
                          <option></option>
                          {categories.data?.filterValues[0]["Values"].map(
                            (c: string, i: number) => (
                              <option key={`category-${i}`}>{c}</option>
                            )
                          )}
                        </Select>
                      </Box>
                      <Box>
                        <Label htmlFor="url" variant="defaultLabel">
                          Division
                        </Label>
                        <Select
                          variant={"defaultInput"}
                          onChange={(e) => {
                            setDivision(e.target.value);
                          }}
                          id="division"
                        >
                          <option></option>
                          {categories.data?.filterValues[1]["Values"].map(
                            (c: string, i: number) => (
                              <option key={`category-${i}`}>{c}</option>
                            )
                          )}
                        </Select>
                      </Box>
                    </>
                  )}
                  {!categories &&
                    !webscorerCategories &&
                    !crossResultsCategories &&
                    !omniCategories && (
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
                  {webscorerCategories && (
                    <Box sx={{ marginLeft: "auto" }}>
                      <Button
                        disabled={isLoading ? true : false}
                        variant="primaryButton"
                        onClick={() => {
                          setIsLoading(true);
                          getWebscorerResults().then((results) => {
                            setWebscorerResultPreview &&
                              setWebscorerResultPreview({
                                results,
                                selected: undefined,
                              });
                            setPreviewWebscorerResults(true);
                          });
                          setIsLoading(false);
                        }}
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
                  {crossResultsCategories && (
                    <Box sx={{ marginLeft: "auto" }}>
                      <Button
                        disabled={isLoading ? true : false}
                        variant="primaryButton"
                        onClick={() => {
                          setIsLoading(true);
                          getCrossResults().then((results) => {
                            const catResults = results
                              .filter(
                                (row) =>
                                  row["RaceCategoryName"] ===
                                  crossResultsCategory
                              )
                              .sort((a, b) =>
                                a["Place"] > b["Place"] ? 1 : -1
                              );
                            setWebscorerResultPreview &&
                              setCrossResults &&
                              setCrossResults({
                                results: catResults,
                                selected: undefined,
                              });
                            setPreviewCrossResults(true);
                          });
                          setIsLoading(false);
                        }}
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
                  {categories && (
                    <Box sx={{ marginLeft: "auto" }}>
                      <Button
                        id="get-race-results"
                        type="button"
                        variant="primaryButton"
                        onClick={() => {
                          setIsLoading(true);
                          getResults().then((r: any) => {
                            setRaceResults &&
                              setRaceResults({
                                results: r as any,
                                selected: undefined,
                              });
                            setPreviewResults(true);
                            setIsLoading(false);
                          });
                        }}
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
                  {omniCategories && (
                    <Box sx={{ marginLeft: "auto" }}>
                      <Button
                        id="get-race-results-omni"
                        type="button"
                        variant="primaryButton"
                        onClick={() => {
                          setIsLoading(true);
                          getOmniResults().then((r: any) => {
                            console.log(r);
                            setOmniResults &&
                              setOmniResults({
                                results: r as any,
                                selected: undefined,
                              });
                            // setRaceResults &&
                            // setRaceResults({
                            //   results: r as any,
                            //   selected: undefined,
                            // });
                            setPreviewOmniResults(true);
                            setIsLoading(false);
                          });
                        }}
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
                </Flex>
              </form>
            </Flex>
          )}
      </StandardModal>
    </>
  );
};

export default RaceResultsImport;
