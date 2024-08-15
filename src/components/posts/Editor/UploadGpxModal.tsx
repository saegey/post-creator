import { Box, Flex, Button, Text, Input, Progress, Close } from "theme-ui";
import React from "react";
import { GraphQLResult } from "@aws-amplify/api";
import { Storage, API, PubSub, Auth } from "aws-amplify";
import { ZenObservable } from "zen-observable-ts";

import { GetPostInitialQuery, UpdatePostMutation } from "../../../API";
import { updatePost } from "../../../graphql/mutations";
import BlackBox from "../../layout/BlackBox";
import { PostContext } from "../../PostContext";
import { getActivity } from "../../../actions/PostGet";
import {
  attachIoTPolicyToUser,
  configurePubSub,
  getEndpoint,
} from "../../../actions/PubSub";
import { EditorContext } from "./EditorContext";
import { getPostInitial } from "../../../graphql/customQueries";
import { PostContextType } from "../../../types/common";
import { getActivityData } from "../../../../lib/editorApi";
import { set } from "cypress/types/lodash";

const UploadGpxModal = () => {
  const [fileData, setFileData] = React.useState<File>();
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState({ loaded: 0, total: 0 });

  const [processingFile, setIsProcessingFile] = React.useState(false);

  const subRef = React.useRef<ZenObservable.Subscription | null>(null);
  const [subPubConfigured, setSubPubConfigured] = React.useState(false);
  const [processingGpxStatus, setProcessingGpxStatus] = React.useState("");

  const {
    id,
    currentFtp,
    setActivity,
    setGpxFile,
    setDistance,
    setElevationTotal,
    setElapsedTime,
    setStoppedTime,
    setTimeInRed,
    setNormalizedPower,
    setTempAnalysis,
    setHeartAnalysis,
    setCadenceAnalysis,
    setPowerAnalysis,
    setPowerZoneBuckets,
    setPowerZones,
    setTimeSeriesFile,
    setPowers,
    setHearts,
    elevations,
    setElevations,
  }: PostContextType = React.useContext(PostContext);

  const { setIsGpxUploadOpen } = React.useContext(EditorContext);

  const uploadFile = async () => {
    setIsUploading(true);
    setIsProcessingFile(true);

    if (!fileData || !fileData.name) return;

    const user = await Auth.currentUserCredentials();

    await Storage.put(`uploads/${fileData.name.replace(" ", "_")}`, fileData, {
      progressCallback(progress: { loaded: number; total: number }) {
        setProgress({ loaded: progress.loaded, total: progress.total });
        if (progress.total === progress.loaded) {
          setProcessingGpxStatus("File successfully uploaded");
        }
      },
      metadata: {
        postId: id ? id : "",
        currentFtp: (currentFtp ? currentFtp : 0).toString(),
        identityId: user.identityId,
      },
      contentType: fileData.type,
      level: "private",
    });

    // try {
    //   (await API.graphql({
    //     authMode: "AMAZON_COGNITO_USER_POOLS",
    //     query: updatePost,
    //     variables: {
    //       input: {
    //         id: id,
    //         gpxFile: result.key,
    //       },
    //     },
    //   })) as GraphQLResult<UpdatePostMutation>;
    // } catch (error) {
    //   console.error(error);
    //   setIsUploading(false);
    // }
  };

  const getPost = async () => {
    const res = (await API.graphql({
      query: getPostInitial,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: id,
      },
    })) as GraphQLResult<GetPostInitialQuery>;

    const post = res?.data?.getPost;

    if (!post || !post.timeSeriesFile) {
      throw new Error("Post is undefined");
    }

    setGpxFile && setGpxFile(post.gpxFile || "");
    setElevationTotal && setElevationTotal(post.elevationTotal);
    setDistance && setDistance(post.distance);
    setElapsedTime && setElapsedTime(post.elapsedTime);
    setStoppedTime && setStoppedTime(post.stoppedTime);
    setTimeSeriesFile && setTimeSeriesFile(post.timeSeriesFile);
    setNormalizedPower && setNormalizedPower(post.normalizedPower);
    setTempAnalysis &&
      setTempAnalysis(post.tempAnalysis ? JSON.parse(post.tempAnalysis) : {});
    setHeartAnalysis &&
      setHeartAnalysis(
        post.heartAnalysis ? JSON.parse(post.heartAnalysis) : {}
      );
    setCadenceAnalysis &&
      setCadenceAnalysis(
        post.cadenceAnalysis ? JSON.parse(post.cadenceAnalysis) : {}
      );
    setPowerZones &&
      setPowerZones(post.powerZones ? JSON.parse(post.powerZones) : {});
    setPowerZoneBuckets &&
      setPowerZoneBuckets(
        post.powerZoneBuckets ? JSON.parse(post.powerZoneBuckets) : {}
      );
    setTimeInRed && setTimeInRed(post.timeInRed);

    // const result = (await Storage.get(post.timeSeriesFile, {
    //   download: true,
    //   level: "private",
    // })) as unknown as { Body: string };

    // const timeSeriesData = await new Response(result.Body).json();
    // // setPowerAnalysis && setPowerAnalysis(timeSeriesData.powerAnalysis);
    // // setPowers && setPowers(timeSeriesData.powers);
    // // setHearts && setHearts(timeSeriesData.hearts);

    // const activity = await getActivity(timeSeriesData);

    // console.log(activity);
    // setActivity && setActivity(activity);
    // setProcessingGpxStatus("GPX file has been processed and analyzed");
    const payload = await getActivityData(post.timeSeriesFile);
    if (!payload) {
      console.log("no data found for post");
      return;
    }
    console.log("payload:", payload);

    // setPowerAnalysis && setPowerAnalysis(payload.powerAnalysis);
    // setPowers && setPowers(payload.powers);
    // setHearts && setHearts(payload.hearts);
    setElevations && setElevations(payload.elevation);
    setActivity &&
      setActivity(payload.activity?.map((item) => ({ ...item })) ?? []);
    setIsProcessingFile(false);
  };

  const handlePhase = (phase: string) => {
    const timestamp = new Date().toISOString();

    switch (phase) {
      case "go-start-processing":
        setProcessingGpxStatus(`Processing Fit file @ ${timestamp}.`);
        break;
      case "go-finish-processing":
        setProcessingGpxStatus(
          `${processingGpxStatus}. Fit file processed. ${timestamp}`
        );
        getPost();
        break;
      case "file-downloaded":
        setProcessingGpxStatus("File being downloaded for processing.");
        break;
      case "meta-downloaded":
        setProcessingGpxStatus("File metadata being fetched.");
        break;
      case "xml-parse":
        setProcessingGpxStatus("XML is being parsed.");
        break;
      case "gpx-parse":
        setProcessingGpxStatus("GPX XML is being converted to GeoJSON.");
        break;
      case "process-data":
        setProcessingGpxStatus(
          "Data is being processed and calculating metrics."
        );
        break;
      case "update-data":
        setProcessingGpxStatus("Metrics are being saved.");
        getPost();
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    const setUpSub = async () => {
      if (!subPubConfigured) {
        const endpoint = await getEndpoint();
        await configurePubSub(endpoint);
        await attachIoTPolicyToUser();
        setSubPubConfigured(true);
        console.log("subPubConfigured:", subPubConfigured);
      }

      if (subRef.current) {
        console.log("unsubscribing");
        // If a subscription already exists, unsubscribe first
        subRef.current.unsubscribe();
      }

      subRef.current = PubSub.subscribe(`post-${id}`).subscribe({
        next: (data: any) => {
          console.log("data:", data.value);
          handlePhase(data.value.phase as string);
        },
        error: (error) => console.error(error),
      });
    };

    setUpSub();

    return () => {
      if (subRef.current) {
        subRef.current.unsubscribe();
      }
    };
  }, [subPubConfigured, id]);

  return (
    <BlackBox>
      <Box
        sx={{
          width: "80%",
          maxWidth: "710px",
          margin: "auto",
          background: "background",
          borderRadius: "5px",
          padding: "20px",
          zIndex: 6000,
        }}
      >
        <Flex
          sx={{
            borderBottomColor: "divider",
            borderBottomStyle: "solid",
            borderBottomWidth: "1px",
          }}
        >
          <Box>
            <Text
              as="div"
              sx={{
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              Upload GPX file
            </Text>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
            }}
          >
            <Close
              onClick={() => {
                setIsGpxUploadOpen(false);
              }}
            />
          </Box>
        </Flex>

        <Box>
          <Box sx={{ marginY: "20px" }}>
            <Input
              type="file"
              variant="defaultInput"
              disabled={isUploading}
              onChange={(e) => {
                if (e.target && e.target.files && e.target.files.length > 0) {
                  setFileData(e.target?.files[0]);
                } else {
                  console.log("no file attached");
                }
              }}
            />
          </Box>
          <Box>
            <Button
              onClick={uploadFile}
              variant="primaryButton"
              disabled={processingFile}
            >
              Upload
            </Button>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            {progress.loaded > 0 && (
              <>
                <Progress
                  max={progress.total}
                  value={progress.loaded}
                ></Progress>
                <p>{`${((progress.loaded / progress.total) * 100).toFixed(
                  0
                )}%`}</p>
              </>
            )}
          </Box>
          <Text as="span">{processingGpxStatus}</Text>
        </Box>
      </Box>
    </BlackBox>
  );
};

export default UploadGpxModal;
