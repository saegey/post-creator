import {
  Flex,
  Box,
  Label,
  Input,
  Button,
  Text,
  Select,
  Spinner,
  Link,
} from "theme-ui";
import { API } from "aws-amplify";
import React from "react";

import { PostContext } from "../../PostContext";
import { EditorContext } from "../Editor/EditorContext";
import RaceResultsPreview from "./RaceResultsPreview";
import WebscorerResultsPreview from "./WebscorerResultsPreview";
import StandardModal from "../../shared/StandardModal";
import { CustomEditor } from "../../../types/common";

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
    data: { filterValues: Array<Array<string>> };
  }>();
  const [category, setCategory] = React.useState("");
  const [webscorerCategory, setWebscorerCategory] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [webscorerCategories, setWebscorerCategeries] =
    React.useState<Array<string> | null>(null);
  const [raceId, setRaceId] = React.useState<string | null>();
  const [key, setKey] = React.useState();
  const [server, setServer] = React.useState();
  const [previewResults, setPreviewResults] = React.useState(false);
  const [previewWebscorerResults, setPreviewWebscorerResults] =
    React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const { isRaceResultsModalOpen, setIsRaceResultsModalOpen } =
    React.useContext(EditorContext);

  const { setRaceResults, setWebscorerResultPreview } =
    React.useContext(PostContext);

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

    const data = res.data.data.map((d) => {
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
      return temp;
    });

    return data;
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

  const getCategories = async ({ url }: { url: string }) => {
    const resultsUrl = new URL(url);
    setRaceId(resultsUrl.pathname.split("/")[1]);

    const apiName = "api12660653";
    const path = `/raceresult?raceId=${resultsUrl.pathname.split("/")[1]}`;
    const myInit = {
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    };
    const response = await API.get(apiName, path, myInit);
    setKey(response.data.key);
    setServer(response.data.server);
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
        {previewResults && <RaceResultsPreview editor={editor} />}
        {previewWebscorerResults && <WebscorerResultsPreview editor={editor} />}
        {!previewResults && (
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
                console.log(domain);
                switch (domain.hostname) {
                  case "www.webscorer.com":
                    console.log("Oranges are $0.59 a pound.");
                    getWebScorerCategories({ url }).then(() => {
                      setIsLoading(false);
                    });
                    break;
                  case "my.raceresult.com":
                    console.log("Mangoes and papayas are $2.79 a pound.");
                    getCategories({ url }).then(() => setIsLoading(false));
                    // Expected output: "Mangoes and papayas are $2.79 a pound."
                    break;
                  default:
                    console.log(`Sorry, we are out of shit.`);
                }

                // getCategories({ url }).then(() => setIsLoading(false));
              }}
              style={{ width: "100%" }}
            >
              <Flex sx={{ gap: "20px", flexDirection: "column" }}>
                <Box sx={{ marginTop: "20px" }}>
                  <Label htmlFor="url" variant="defaultLabel">
                    Results Url
                  </Label>
                  <Input
                    id="url"
                    name="url"
                    variant={"defaultInput"}
                    readOnly={raceId ? true : false}
                  />
                </Box>
                {/* <Flex sx={{ flexDirection: "column", gap: "10px" }}>
                  <Text>Supported Providers:</Text>
                  <Link href="https://www.raceresult.com/" target="_blank">
                    Race Result
                  </Link>
                  <Link href="https://www.webscorer.com/" target="_blank">
                    webscorer
                  </Link>
                </Flex> */}
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
                          // setCategory(e.target.value);
                          // console.log(e.target.value);
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
                        {categories.data?.filterValues[0].map(
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
                      >
                        <option></option>
                        {categories.data?.filterValues[1].map(
                          (c: string, i: number) => (
                            <option key={`category-${i}`}>{c}</option>
                          )
                        )}
                      </Select>
                    </Box>
                  </>
                )}
                {!categories && !webscorerCategories && (
                  <Box sx={{ marginLeft: "auto" }}>
                    <Button
                      disabled={isLoading ? true : false}
                      variant="primaryButton"
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
                          // console.log(r);
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
                {categories && (
                  <Box sx={{ marginLeft: "auto" }}>
                    <Button
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
              </Flex>
            </form>
          </Flex>
        )}
      </StandardModal>
    </>
  );
};

export default RaceResultsImport;
