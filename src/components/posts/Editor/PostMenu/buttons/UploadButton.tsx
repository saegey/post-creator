import { Box, Button, Flex, IconButton, Input, Label, Spinner, Text } from "theme-ui";
import React from "react";
import { Auth, Storage } from "aws-amplify";

import { usePost } from "../../../../PostContext";
import usePubSubSubscription from "../../../../../hooks/usePubSubSubscription";
import { getPost } from "../../../../../actions/PostGet";
import UploadIcon from "../../../../icons/UploadIcon";

const UploadButton = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [processingFile, setIsProcessingFile] = React.useState(false);
  const [progress, setProgress] = React.useState({ loaded: 0, total: 0 });
  const [processingGpxStatus, setProcessingGpxStatus] = React.useState("");
  const postCtx = usePost();
  const { id, currentFtp, gpxFile } = postCtx;

  const handlePhase = async (payload: { phase: string }) => {
    const { phase } = payload;
    switch (phase) {
      case "go-start-processing":
        setProcessingGpxStatus(`Analyzing Fit file`);

        break;
      case "go-finish-processing":
        setProcessingGpxStatus(`Refreshing post data`);
        await getPost(id, postCtx);

        setProcessingGpxStatus(`Fit file processed`);
        setIsProcessingFile(false);

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
        setIsProcessingFile(false);
        getPost(id, postCtx);

        break;
      default:
        break;
    }
  };

  usePubSubSubscription(id, handlePhase);

  const handleButtonClick = () => {
    fileInputRef.current!.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProcessingGpxStatus("");
    setIsProcessingFile(true);

    const file = event.target.files?.[0];

    if (!file || !file.name) {
      return;
    }

    // Check if the file extension is .fit
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (fileExtension !== "fit") {
      setIsProcessingFile(false);
      setProcessingGpxStatus("Invalid file type. Please upload a .fit file.");
      return;
    }

    const user = await Auth.currentUserCredentials();

    await Storage.put(`uploads/${file.name.replace(" ", "_")}`, file, {
      progressCallback(progress: { loaded: number; total: number }) {
        setProgress({ loaded: progress.loaded, total: progress.total });
        setProcessingGpxStatus(
          `Uploading file - ${(
            (progress.loaded / progress.total) *
            100
          ).toFixed(0)}%`
        );
      },
      metadata: {
        postId: id ? id : "",
        currentFtp: (currentFtp ? currentFtp : 0).toString(),
        identityId: user.identityId,
      },
      contentType: file.type,
      level: "private",
    });
  };

  return (
    <>
      <Flex sx={{ gap: "10px" }}>
        <Label htmlFor="gpxFile" variant="defaultLabel">
          Activity <Text sx={{ fontSize: "15px" }}>(.fit)</Text>
        </Label>
        <Text sx={{ color: "textMuted" }} data-testid="processing-status">
          {processingGpxStatus}
        </Text>
      </Flex>
      <Flex sx={{ gap: "10px", flexDirection: ["column", "row", "row"] }}>
        <Box sx={{ flex: 1 }}>
          <Input
            id="gpxFile"
            name="gpxFile"
            defaultValue={gpxFile ? gpxFile : ""}
            variant={"defaultInput"}
            readOnly={true}
          />
        </Box>
        <Input
          data-testid="gpxFile"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          sx={{ display: "none" }}
        />
        <Button
          type="button"
          disabled={processingFile}
          onClick={handleButtonClick}
          variant="primaryButton"
        >
          <Flex sx={{ alignItems: "center", gap: "2px" }}>
            <IconButton
              as="div"
              sx={{
                width: ["24px", "24px", "24px"],
                height: ["24px", "24px", "24px"],
              }}
            >
              <UploadIcon />
            </IconButton>
            <Text>Upload</Text>
            {processingFile && (
              <Spinner
                data-testid="spinner"
                sx={{ size: "20px", color: "secondary" }}
              />
            )}
          </Flex>
        </Button>
      </Flex>
      <Box sx={{ marginTop: "5px" }}>
        <Text sx={{ fontSize: "13px", color: "muted" }}>
          Need help exporting a .fit file?{" "}
          <a
            href="https://monopad.mintlify.app/export"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn how to export from different platforms.
          </a>
        </Text>
      </Box>
    </>
  );
};

export default UploadButton;
