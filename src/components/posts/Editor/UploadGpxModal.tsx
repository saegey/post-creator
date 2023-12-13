import { Box, Flex, Button, Text, Input, Progress, Close } from "theme-ui";
import React from "react";
import { GraphQLResult } from "@aws-amplify/api";
import { Storage, API, PubSub, Auth } from "aws-amplify";
import { ZenObservable } from "zen-observable-ts";

import { UpdatePostMutation } from "../../../API";
import { updatePost } from "../../../graphql/mutations";
import BlackBox from "../../layout/BlackBox";
import { PostContext, PostContextType } from "../../PostContext";
import { getActivity } from "../../../actions/PostGet";
import {
  attachIoTPolicyToUser,
  configurePubSub,
  getEndpoint,
} from "../../../actions/PubSub";
import { EditorContext } from "./EditorContext";
import { getPostInitial } from "../../../graphql/customQueries";

const UploadGpxModal = () => {
  const [fileData, setFileData] = React.useState<File>();
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState({ loaded: 0, total: 0 });
  const [processingGpxStatus, setProcessingGpxStatus] =
    React.useState("Pending");
  const [processingFile, setIsProcessingFile] = React.useState(false);
  const [subPubConfigured, setSubPubConfigured] = React.useState(false);

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
  }: PostContextType = React.useContext(PostContext);

  const { setIsGpxUploadOpen } = React.useContext(EditorContext);

  const uploadFile = async () => {
    setIsUploading(true);
    setIsProcessingFile(true);

    if (!fileData || !fileData.name) return;

    const user = await Auth.currentUserCredentials();

    const result = await Storage.put(
      `uploads/${fileData.name.replace(" ", "_")}`,
      fileData,
      {
        progressCallback(progress) {
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
      }
    );

    try {
      (await API.graphql({
        authMode: "AMAZON_COGNITO_USER_POOLS",
        query: updatePost,
        variables: {
          input: {
            id: id,
            gpxFile: result.key,
          },
        },
      })) as GraphQLResult<UpdatePostMutation>;
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  };

  const getPost = async () => {
    const { data } = (await API.graphql({
      query: getPostInitial,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: id,
      },
    })) as any;
    const {
      timeSeriesFile,
      gpxFile,
      elevationTotal,
      distance,
      elapsedTime,
      stoppedTime,
      normalizedPower,
      tempAnalysis,
      cadenceAnalysis,
      heartAnalysis,
      powerZones,
      powerZoneBuckets,
      timeInRed,
    } = data.getPost;
    setGpxFile && setGpxFile(gpxFile);
    setElevationTotal && setElevationTotal(elevationTotal);
    setDistance && setDistance(distance);
    setElapsedTime && setElapsedTime(elapsedTime);
    setStoppedTime && setStoppedTime(stoppedTime);
    setTimeSeriesFile && setTimeSeriesFile(timeSeriesFile);
    setNormalizedPower && setNormalizedPower(normalizedPower);
    setTempAnalysis && setTempAnalysis(JSON.parse(tempAnalysis));
    setHeartAnalysis && setHeartAnalysis(JSON.parse(heartAnalysis));
    setCadenceAnalysis && setCadenceAnalysis(JSON.parse(cadenceAnalysis));
    setPowerZones && setPowerZones(JSON.parse(powerZones));
    setPowerZoneBuckets && setPowerZoneBuckets(JSON.parse(powerZoneBuckets));
    setTimeInRed && setTimeInRed(timeInRed);

    const result = await Storage.get(timeSeriesFile, {
      download: true,
      // customPrefix: {
      //   public: 'private/us-east-1:29b6299d-6fd7-44d5-a53e-2a94fdf5401d/',
      // },
      level: "private",
    });
    const timeSeriesData = await new Response(result.Body).json();
    setPowerAnalysis && setPowerAnalysis(timeSeriesData.powerAnalysis);
    setPowers && setPowers(timeSeriesData.powers);
    setHearts && setHearts(timeSeriesData.hearts);

    const activity = await getActivity(timeSeriesData);

    // console.log(activity);
    setActivity && setActivity(activity);
    setProcessingGpxStatus("GPX file has been processed and analyzed");
    setIsProcessingFile(false);
  };

  const setUpSub = async () => {
    if (!subPubConfigured) {
      const endpoint = await getEndpoint();
      await configurePubSub(endpoint);
      await attachIoTPolicyToUser();
      setSubPubConfigured(true);
    }

    return PubSub.subscribe(`post-${id}`).subscribe({
      next: (data: any) => {
        const phase = data.value.phase as string;
        if (phase === "file-downloaded") {
          setProcessingGpxStatus("File being downloaded for processing.");
        }
        if (phase === "meta-downloaded") {
          setProcessingGpxStatus("File metadata being fetched.");
        }
        if (phase === "xml-parse") {
          setProcessingGpxStatus("XML is being parsed.");
        }

        if (phase === "gpx-parse") {
          setProcessingGpxStatus("GPX XML is being converted to GeoJSON.");
        }

        if (phase === "process-data") {
          setProcessingGpxStatus(
            "Data is being processed and calculating metrics."
          );
        }

        if (phase === "update-data") {
          setProcessingGpxStatus("Metrics are being saved.");
          getPost();
        }
      },
      error: (error) => console.error(error),
    });
  };

  React.useEffect(() => {
    let subUpdates: ZenObservable.Subscription;

    setUpSub().then((sub) => {
      subUpdates = sub;
    });

    return () => {
      if (subUpdates) {
        subUpdates.unsubscribe();
      }
    };
  }, [subPubConfigured]);

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
          zIndex: 5000,
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
          <Text as="span">
            {progress.total === progress.loaded && progress.loaded !== 0
              ? processingGpxStatus
              : ""}
          </Text>
        </Box>
      </Box>
    </BlackBox>
  );
};

export default UploadGpxModal;
