/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createPublishedPost } from "../graphql/mutations";
export default function PublishedPostCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    gpxFile: "",
    images: "",
    headerImage: "",
    date: "",
    publishedDate: "",
    location: "",
    postLocation: "",
    stravaUrl: "",
    resultsUrl: "",
    type: "",
    subType: "",
    teaser: "",
    currentFtp: "",
    components: "",
    powerAnalysis: "",
    author: "",
    elevationTotal: "",
    normalizedPower: "",
    distance: "",
    heartAnalysis: "",
    cadenceAnalysis: "",
    tempAnalysis: "",
    elapsedTime: "",
    stoppedTime: "",
    timeInRed: "",
    powerZones: "",
    timeSeriesFile: "",
    powerZoneBuckets: "",
    createdAt: "",
    heroImage: "",
    subhead: "",
    shortUrl: "",
    raceResults: "",
    webscorerResults: "",
    crossResults: "",
    omniResults: "",
    runSignupResults: "",
    raceResultsProvider: "",
    originalPostId: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [gpxFile, setGpxFile] = React.useState(initialValues.gpxFile);
  const [images, setImages] = React.useState(initialValues.images);
  const [headerImage, setHeaderImage] = React.useState(
    initialValues.headerImage
  );
  const [date, setDate] = React.useState(initialValues.date);
  const [publishedDate, setPublishedDate] = React.useState(
    initialValues.publishedDate
  );
  const [location, setLocation] = React.useState(initialValues.location);
  const [postLocation, setPostLocation] = React.useState(
    initialValues.postLocation
  );
  const [stravaUrl, setStravaUrl] = React.useState(initialValues.stravaUrl);
  const [resultsUrl, setResultsUrl] = React.useState(initialValues.resultsUrl);
  const [type, setType] = React.useState(initialValues.type);
  const [subType, setSubType] = React.useState(initialValues.subType);
  const [teaser, setTeaser] = React.useState(initialValues.teaser);
  const [currentFtp, setCurrentFtp] = React.useState(initialValues.currentFtp);
  const [components, setComponents] = React.useState(initialValues.components);
  const [powerAnalysis, setPowerAnalysis] = React.useState(
    initialValues.powerAnalysis
  );
  const [author, setAuthor] = React.useState(initialValues.author);
  const [elevationTotal, setElevationTotal] = React.useState(
    initialValues.elevationTotal
  );
  const [normalizedPower, setNormalizedPower] = React.useState(
    initialValues.normalizedPower
  );
  const [distance, setDistance] = React.useState(initialValues.distance);
  const [heartAnalysis, setHeartAnalysis] = React.useState(
    initialValues.heartAnalysis
  );
  const [cadenceAnalysis, setCadenceAnalysis] = React.useState(
    initialValues.cadenceAnalysis
  );
  const [tempAnalysis, setTempAnalysis] = React.useState(
    initialValues.tempAnalysis
  );
  const [elapsedTime, setElapsedTime] = React.useState(
    initialValues.elapsedTime
  );
  const [stoppedTime, setStoppedTime] = React.useState(
    initialValues.stoppedTime
  );
  const [timeInRed, setTimeInRed] = React.useState(initialValues.timeInRed);
  const [powerZones, setPowerZones] = React.useState(initialValues.powerZones);
  const [timeSeriesFile, setTimeSeriesFile] = React.useState(
    initialValues.timeSeriesFile
  );
  const [powerZoneBuckets, setPowerZoneBuckets] = React.useState(
    initialValues.powerZoneBuckets
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [heroImage, setHeroImage] = React.useState(initialValues.heroImage);
  const [subhead, setSubhead] = React.useState(initialValues.subhead);
  const [shortUrl, setShortUrl] = React.useState(initialValues.shortUrl);
  const [raceResults, setRaceResults] = React.useState(
    initialValues.raceResults
  );
  const [webscorerResults, setWebscorerResults] = React.useState(
    initialValues.webscorerResults
  );
  const [crossResults, setCrossResults] = React.useState(
    initialValues.crossResults
  );
  const [omniResults, setOmniResults] = React.useState(
    initialValues.omniResults
  );
  const [runSignupResults, setRunSignupResults] = React.useState(
    initialValues.runSignupResults
  );
  const [raceResultsProvider, setRaceResultsProvider] = React.useState(
    initialValues.raceResultsProvider
  );
  const [originalPostId, setOriginalPostId] = React.useState(
    initialValues.originalPostId
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setGpxFile(initialValues.gpxFile);
    setImages(initialValues.images);
    setHeaderImage(initialValues.headerImage);
    setDate(initialValues.date);
    setPublishedDate(initialValues.publishedDate);
    setLocation(initialValues.location);
    setPostLocation(initialValues.postLocation);
    setStravaUrl(initialValues.stravaUrl);
    setResultsUrl(initialValues.resultsUrl);
    setType(initialValues.type);
    setSubType(initialValues.subType);
    setTeaser(initialValues.teaser);
    setCurrentFtp(initialValues.currentFtp);
    setComponents(initialValues.components);
    setPowerAnalysis(initialValues.powerAnalysis);
    setAuthor(initialValues.author);
    setElevationTotal(initialValues.elevationTotal);
    setNormalizedPower(initialValues.normalizedPower);
    setDistance(initialValues.distance);
    setHeartAnalysis(initialValues.heartAnalysis);
    setCadenceAnalysis(initialValues.cadenceAnalysis);
    setTempAnalysis(initialValues.tempAnalysis);
    setElapsedTime(initialValues.elapsedTime);
    setStoppedTime(initialValues.stoppedTime);
    setTimeInRed(initialValues.timeInRed);
    setPowerZones(initialValues.powerZones);
    setTimeSeriesFile(initialValues.timeSeriesFile);
    setPowerZoneBuckets(initialValues.powerZoneBuckets);
    setCreatedAt(initialValues.createdAt);
    setHeroImage(initialValues.heroImage);
    setSubhead(initialValues.subhead);
    setShortUrl(initialValues.shortUrl);
    setRaceResults(initialValues.raceResults);
    setWebscorerResults(initialValues.webscorerResults);
    setCrossResults(initialValues.crossResults);
    setOmniResults(initialValues.omniResults);
    setRunSignupResults(initialValues.runSignupResults);
    setRaceResultsProvider(initialValues.raceResultsProvider);
    setOriginalPostId(initialValues.originalPostId);
    setErrors({});
  };
  const validations = {
    title: [{ type: "Required" }],
    gpxFile: [],
    images: [{ type: "JSON" }],
    headerImage: [],
    date: [],
    publishedDate: [],
    location: [],
    postLocation: [],
    stravaUrl: [],
    resultsUrl: [],
    type: [],
    subType: [],
    teaser: [],
    currentFtp: [],
    components: [{ type: "JSON" }],
    powerAnalysis: [{ type: "JSON" }],
    author: [{ type: "JSON" }],
    elevationTotal: [],
    normalizedPower: [],
    distance: [],
    heartAnalysis: [{ type: "JSON" }],
    cadenceAnalysis: [{ type: "JSON" }],
    tempAnalysis: [{ type: "JSON" }],
    elapsedTime: [],
    stoppedTime: [],
    timeInRed: [],
    powerZones: [{ type: "JSON" }],
    timeSeriesFile: [],
    powerZoneBuckets: [{ type: "JSON" }],
    createdAt: [{ type: "Required" }],
    heroImage: [{ type: "JSON" }],
    subhead: [],
    shortUrl: [],
    raceResults: [{ type: "JSON" }],
    webscorerResults: [{ type: "JSON" }],
    crossResults: [{ type: "JSON" }],
    omniResults: [{ type: "JSON" }],
    runSignupResults: [{ type: "JSON" }],
    raceResultsProvider: [],
    originalPostId: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          gpxFile,
          images,
          headerImage,
          date,
          publishedDate,
          location,
          postLocation,
          stravaUrl,
          resultsUrl,
          type,
          subType,
          teaser,
          currentFtp,
          components,
          powerAnalysis,
          author,
          elevationTotal,
          normalizedPower,
          distance,
          heartAnalysis,
          cadenceAnalysis,
          tempAnalysis,
          elapsedTime,
          stoppedTime,
          timeInRed,
          powerZones,
          timeSeriesFile,
          powerZoneBuckets,
          createdAt,
          heroImage,
          subhead,
          shortUrl,
          raceResults,
          webscorerResults,
          crossResults,
          omniResults,
          runSignupResults,
          raceResultsProvider,
          originalPostId,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createPublishedPost.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PublishedPostCreateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Gpx file"
        isRequired={false}
        isReadOnly={false}
        value={gpxFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile: value,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.gpxFile ?? value;
          }
          if (errors.gpxFile?.hasError) {
            runValidationTasks("gpxFile", value);
          }
          setGpxFile(value);
        }}
        onBlur={() => runValidationTasks("gpxFile", gpxFile)}
        errorMessage={errors.gpxFile?.errorMessage}
        hasError={errors.gpxFile?.hasError}
        {...getOverrideProps(overrides, "gpxFile")}
      ></TextField>
      <TextAreaField
        label="Images"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images: value,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.images ?? value;
          }
          if (errors.images?.hasError) {
            runValidationTasks("images", value);
          }
          setImages(value);
        }}
        onBlur={() => runValidationTasks("images", images)}
        errorMessage={errors.images?.errorMessage}
        hasError={errors.images?.hasError}
        {...getOverrideProps(overrides, "images")}
      ></TextAreaField>
      <TextField
        label="Header image"
        isRequired={false}
        isReadOnly={false}
        value={headerImage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage: value,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.headerImage ?? value;
          }
          if (errors.headerImage?.hasError) {
            runValidationTasks("headerImage", value);
          }
          setHeaderImage(value);
        }}
        onBlur={() => runValidationTasks("headerImage", headerImage)}
        errorMessage={errors.headerImage?.errorMessage}
        hasError={errors.headerImage?.hasError}
        {...getOverrideProps(overrides, "headerImage")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date: value,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Published date"
        isRequired={false}
        isReadOnly={false}
        value={publishedDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate: value,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.publishedDate ?? value;
          }
          if (errors.publishedDate?.hasError) {
            runValidationTasks("publishedDate", value);
          }
          setPublishedDate(value);
        }}
        onBlur={() => runValidationTasks("publishedDate", publishedDate)}
        errorMessage={errors.publishedDate?.errorMessage}
        hasError={errors.publishedDate?.hasError}
        {...getOverrideProps(overrides, "publishedDate")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={false}
        isReadOnly={false}
        value={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location: value,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <TextField
        label="Post location"
        isRequired={false}
        isReadOnly={false}
        value={postLocation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation: value,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.postLocation ?? value;
          }
          if (errors.postLocation?.hasError) {
            runValidationTasks("postLocation", value);
          }
          setPostLocation(value);
        }}
        onBlur={() => runValidationTasks("postLocation", postLocation)}
        errorMessage={errors.postLocation?.errorMessage}
        hasError={errors.postLocation?.hasError}
        {...getOverrideProps(overrides, "postLocation")}
      ></TextField>
      <TextField
        label="Strava url"
        isRequired={false}
        isReadOnly={false}
        value={stravaUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl: value,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.stravaUrl ?? value;
          }
          if (errors.stravaUrl?.hasError) {
            runValidationTasks("stravaUrl", value);
          }
          setStravaUrl(value);
        }}
        onBlur={() => runValidationTasks("stravaUrl", stravaUrl)}
        errorMessage={errors.stravaUrl?.errorMessage}
        hasError={errors.stravaUrl?.hasError}
        {...getOverrideProps(overrides, "stravaUrl")}
      ></TextField>
      <TextField
        label="Results url"
        isRequired={false}
        isReadOnly={false}
        value={resultsUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl: value,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.resultsUrl ?? value;
          }
          if (errors.resultsUrl?.hasError) {
            runValidationTasks("resultsUrl", value);
          }
          setResultsUrl(value);
        }}
        onBlur={() => runValidationTasks("resultsUrl", resultsUrl)}
        errorMessage={errors.resultsUrl?.errorMessage}
        hasError={errors.resultsUrl?.hasError}
        {...getOverrideProps(overrides, "resultsUrl")}
      ></TextField>
      <TextField
        label="Type"
        isRequired={false}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type: value,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <TextField
        label="Sub type"
        isRequired={false}
        isReadOnly={false}
        value={subType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType: value,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.subType ?? value;
          }
          if (errors.subType?.hasError) {
            runValidationTasks("subType", value);
          }
          setSubType(value);
        }}
        onBlur={() => runValidationTasks("subType", subType)}
        errorMessage={errors.subType?.errorMessage}
        hasError={errors.subType?.hasError}
        {...getOverrideProps(overrides, "subType")}
      ></TextField>
      <TextField
        label="Teaser"
        isRequired={false}
        isReadOnly={false}
        value={teaser}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser: value,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.teaser ?? value;
          }
          if (errors.teaser?.hasError) {
            runValidationTasks("teaser", value);
          }
          setTeaser(value);
        }}
        onBlur={() => runValidationTasks("teaser", teaser)}
        errorMessage={errors.teaser?.errorMessage}
        hasError={errors.teaser?.hasError}
        {...getOverrideProps(overrides, "teaser")}
      ></TextField>
      <TextField
        label="Current ftp"
        isRequired={false}
        isReadOnly={false}
        value={currentFtp}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp: value,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.currentFtp ?? value;
          }
          if (errors.currentFtp?.hasError) {
            runValidationTasks("currentFtp", value);
          }
          setCurrentFtp(value);
        }}
        onBlur={() => runValidationTasks("currentFtp", currentFtp)}
        errorMessage={errors.currentFtp?.errorMessage}
        hasError={errors.currentFtp?.hasError}
        {...getOverrideProps(overrides, "currentFtp")}
      ></TextField>
      <TextAreaField
        label="Components"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components: value,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.components ?? value;
          }
          if (errors.components?.hasError) {
            runValidationTasks("components", value);
          }
          setComponents(value);
        }}
        onBlur={() => runValidationTasks("components", components)}
        errorMessage={errors.components?.errorMessage}
        hasError={errors.components?.hasError}
        {...getOverrideProps(overrides, "components")}
      ></TextAreaField>
      <TextAreaField
        label="Power analysis"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis: value,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.powerAnalysis ?? value;
          }
          if (errors.powerAnalysis?.hasError) {
            runValidationTasks("powerAnalysis", value);
          }
          setPowerAnalysis(value);
        }}
        onBlur={() => runValidationTasks("powerAnalysis", powerAnalysis)}
        errorMessage={errors.powerAnalysis?.errorMessage}
        hasError={errors.powerAnalysis?.hasError}
        {...getOverrideProps(overrides, "powerAnalysis")}
      ></TextAreaField>
      <TextAreaField
        label="Author"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author: value,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.author ?? value;
          }
          if (errors.author?.hasError) {
            runValidationTasks("author", value);
          }
          setAuthor(value);
        }}
        onBlur={() => runValidationTasks("author", author)}
        errorMessage={errors.author?.errorMessage}
        hasError={errors.author?.hasError}
        {...getOverrideProps(overrides, "author")}
      ></TextAreaField>
      <TextField
        label="Elevation total"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={elevationTotal}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal: value,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.elevationTotal ?? value;
          }
          if (errors.elevationTotal?.hasError) {
            runValidationTasks("elevationTotal", value);
          }
          setElevationTotal(value);
        }}
        onBlur={() => runValidationTasks("elevationTotal", elevationTotal)}
        errorMessage={errors.elevationTotal?.errorMessage}
        hasError={errors.elevationTotal?.hasError}
        {...getOverrideProps(overrides, "elevationTotal")}
      ></TextField>
      <TextField
        label="Normalized power"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={normalizedPower}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower: value,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.normalizedPower ?? value;
          }
          if (errors.normalizedPower?.hasError) {
            runValidationTasks("normalizedPower", value);
          }
          setNormalizedPower(value);
        }}
        onBlur={() => runValidationTasks("normalizedPower", normalizedPower)}
        errorMessage={errors.normalizedPower?.errorMessage}
        hasError={errors.normalizedPower?.hasError}
        {...getOverrideProps(overrides, "normalizedPower")}
      ></TextField>
      <TextField
        label="Distance"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={distance}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance: value,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.distance ?? value;
          }
          if (errors.distance?.hasError) {
            runValidationTasks("distance", value);
          }
          setDistance(value);
        }}
        onBlur={() => runValidationTasks("distance", distance)}
        errorMessage={errors.distance?.errorMessage}
        hasError={errors.distance?.hasError}
        {...getOverrideProps(overrides, "distance")}
      ></TextField>
      <TextAreaField
        label="Heart analysis"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis: value,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.heartAnalysis ?? value;
          }
          if (errors.heartAnalysis?.hasError) {
            runValidationTasks("heartAnalysis", value);
          }
          setHeartAnalysis(value);
        }}
        onBlur={() => runValidationTasks("heartAnalysis", heartAnalysis)}
        errorMessage={errors.heartAnalysis?.errorMessage}
        hasError={errors.heartAnalysis?.hasError}
        {...getOverrideProps(overrides, "heartAnalysis")}
      ></TextAreaField>
      <TextAreaField
        label="Cadence analysis"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis: value,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.cadenceAnalysis ?? value;
          }
          if (errors.cadenceAnalysis?.hasError) {
            runValidationTasks("cadenceAnalysis", value);
          }
          setCadenceAnalysis(value);
        }}
        onBlur={() => runValidationTasks("cadenceAnalysis", cadenceAnalysis)}
        errorMessage={errors.cadenceAnalysis?.errorMessage}
        hasError={errors.cadenceAnalysis?.hasError}
        {...getOverrideProps(overrides, "cadenceAnalysis")}
      ></TextAreaField>
      <TextAreaField
        label="Temp analysis"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis: value,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.tempAnalysis ?? value;
          }
          if (errors.tempAnalysis?.hasError) {
            runValidationTasks("tempAnalysis", value);
          }
          setTempAnalysis(value);
        }}
        onBlur={() => runValidationTasks("tempAnalysis", tempAnalysis)}
        errorMessage={errors.tempAnalysis?.errorMessage}
        hasError={errors.tempAnalysis?.hasError}
        {...getOverrideProps(overrides, "tempAnalysis")}
      ></TextAreaField>
      <TextField
        label="Elapsed time"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={elapsedTime}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime: value,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.elapsedTime ?? value;
          }
          if (errors.elapsedTime?.hasError) {
            runValidationTasks("elapsedTime", value);
          }
          setElapsedTime(value);
        }}
        onBlur={() => runValidationTasks("elapsedTime", elapsedTime)}
        errorMessage={errors.elapsedTime?.errorMessage}
        hasError={errors.elapsedTime?.hasError}
        {...getOverrideProps(overrides, "elapsedTime")}
      ></TextField>
      <TextField
        label="Stopped time"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={stoppedTime}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime: value,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.stoppedTime ?? value;
          }
          if (errors.stoppedTime?.hasError) {
            runValidationTasks("stoppedTime", value);
          }
          setStoppedTime(value);
        }}
        onBlur={() => runValidationTasks("stoppedTime", stoppedTime)}
        errorMessage={errors.stoppedTime?.errorMessage}
        hasError={errors.stoppedTime?.hasError}
        {...getOverrideProps(overrides, "stoppedTime")}
      ></TextField>
      <TextField
        label="Time in red"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={timeInRed}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed: value,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.timeInRed ?? value;
          }
          if (errors.timeInRed?.hasError) {
            runValidationTasks("timeInRed", value);
          }
          setTimeInRed(value);
        }}
        onBlur={() => runValidationTasks("timeInRed", timeInRed)}
        errorMessage={errors.timeInRed?.errorMessage}
        hasError={errors.timeInRed?.hasError}
        {...getOverrideProps(overrides, "timeInRed")}
      ></TextField>
      <TextAreaField
        label="Power zones"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones: value,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.powerZones ?? value;
          }
          if (errors.powerZones?.hasError) {
            runValidationTasks("powerZones", value);
          }
          setPowerZones(value);
        }}
        onBlur={() => runValidationTasks("powerZones", powerZones)}
        errorMessage={errors.powerZones?.errorMessage}
        hasError={errors.powerZones?.hasError}
        {...getOverrideProps(overrides, "powerZones")}
      ></TextAreaField>
      <TextField
        label="Time series file"
        isRequired={false}
        isReadOnly={false}
        value={timeSeriesFile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile: value,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.timeSeriesFile ?? value;
          }
          if (errors.timeSeriesFile?.hasError) {
            runValidationTasks("timeSeriesFile", value);
          }
          setTimeSeriesFile(value);
        }}
        onBlur={() => runValidationTasks("timeSeriesFile", timeSeriesFile)}
        errorMessage={errors.timeSeriesFile?.errorMessage}
        hasError={errors.timeSeriesFile?.hasError}
        {...getOverrideProps(overrides, "timeSeriesFile")}
      ></TextField>
      <TextAreaField
        label="Power zone buckets"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets: value,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.powerZoneBuckets ?? value;
          }
          if (errors.powerZoneBuckets?.hasError) {
            runValidationTasks("powerZoneBuckets", value);
          }
          setPowerZoneBuckets(value);
        }}
        onBlur={() => runValidationTasks("powerZoneBuckets", powerZoneBuckets)}
        errorMessage={errors.powerZoneBuckets?.errorMessage}
        hasError={errors.powerZoneBuckets?.hasError}
        {...getOverrideProps(overrides, "powerZoneBuckets")}
      ></TextAreaField>
      <TextField
        label="Created at"
        isRequired={true}
        isReadOnly={false}
        value={createdAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt: value,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <TextAreaField
        label="Hero image"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage: value,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.heroImage ?? value;
          }
          if (errors.heroImage?.hasError) {
            runValidationTasks("heroImage", value);
          }
          setHeroImage(value);
        }}
        onBlur={() => runValidationTasks("heroImage", heroImage)}
        errorMessage={errors.heroImage?.errorMessage}
        hasError={errors.heroImage?.hasError}
        {...getOverrideProps(overrides, "heroImage")}
      ></TextAreaField>
      <TextField
        label="Subhead"
        isRequired={false}
        isReadOnly={false}
        value={subhead}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead: value,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.subhead ?? value;
          }
          if (errors.subhead?.hasError) {
            runValidationTasks("subhead", value);
          }
          setSubhead(value);
        }}
        onBlur={() => runValidationTasks("subhead", subhead)}
        errorMessage={errors.subhead?.errorMessage}
        hasError={errors.subhead?.hasError}
        {...getOverrideProps(overrides, "subhead")}
      ></TextField>
      <TextField
        label="Short url"
        isRequired={false}
        isReadOnly={false}
        value={shortUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl: value,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.shortUrl ?? value;
          }
          if (errors.shortUrl?.hasError) {
            runValidationTasks("shortUrl", value);
          }
          setShortUrl(value);
        }}
        onBlur={() => runValidationTasks("shortUrl", shortUrl)}
        errorMessage={errors.shortUrl?.errorMessage}
        hasError={errors.shortUrl?.hasError}
        {...getOverrideProps(overrides, "shortUrl")}
      ></TextField>
      <TextAreaField
        label="Race results"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults: value,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.raceResults ?? value;
          }
          if (errors.raceResults?.hasError) {
            runValidationTasks("raceResults", value);
          }
          setRaceResults(value);
        }}
        onBlur={() => runValidationTasks("raceResults", raceResults)}
        errorMessage={errors.raceResults?.errorMessage}
        hasError={errors.raceResults?.hasError}
        {...getOverrideProps(overrides, "raceResults")}
      ></TextAreaField>
      <TextAreaField
        label="Webscorer results"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults: value,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.webscorerResults ?? value;
          }
          if (errors.webscorerResults?.hasError) {
            runValidationTasks("webscorerResults", value);
          }
          setWebscorerResults(value);
        }}
        onBlur={() => runValidationTasks("webscorerResults", webscorerResults)}
        errorMessage={errors.webscorerResults?.errorMessage}
        hasError={errors.webscorerResults?.hasError}
        {...getOverrideProps(overrides, "webscorerResults")}
      ></TextAreaField>
      <TextAreaField
        label="Cross results"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults: value,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.crossResults ?? value;
          }
          if (errors.crossResults?.hasError) {
            runValidationTasks("crossResults", value);
          }
          setCrossResults(value);
        }}
        onBlur={() => runValidationTasks("crossResults", crossResults)}
        errorMessage={errors.crossResults?.errorMessage}
        hasError={errors.crossResults?.hasError}
        {...getOverrideProps(overrides, "crossResults")}
      ></TextAreaField>
      <TextAreaField
        label="Omni results"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults: value,
              runSignupResults,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.omniResults ?? value;
          }
          if (errors.omniResults?.hasError) {
            runValidationTasks("omniResults", value);
          }
          setOmniResults(value);
        }}
        onBlur={() => runValidationTasks("omniResults", omniResults)}
        errorMessage={errors.omniResults?.errorMessage}
        hasError={errors.omniResults?.hasError}
        {...getOverrideProps(overrides, "omniResults")}
      ></TextAreaField>
      <TextAreaField
        label="Run signup results"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults: value,
              raceResultsProvider,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.runSignupResults ?? value;
          }
          if (errors.runSignupResults?.hasError) {
            runValidationTasks("runSignupResults", value);
          }
          setRunSignupResults(value);
        }}
        onBlur={() => runValidationTasks("runSignupResults", runSignupResults)}
        errorMessage={errors.runSignupResults?.errorMessage}
        hasError={errors.runSignupResults?.hasError}
        {...getOverrideProps(overrides, "runSignupResults")}
      ></TextAreaField>
      <TextField
        label="Race results provider"
        isRequired={false}
        isReadOnly={false}
        value={raceResultsProvider}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider: value,
              originalPostId,
            };
            const result = onChange(modelFields);
            value = result?.raceResultsProvider ?? value;
          }
          if (errors.raceResultsProvider?.hasError) {
            runValidationTasks("raceResultsProvider", value);
          }
          setRaceResultsProvider(value);
        }}
        onBlur={() =>
          runValidationTasks("raceResultsProvider", raceResultsProvider)
        }
        errorMessage={errors.raceResultsProvider?.errorMessage}
        hasError={errors.raceResultsProvider?.hasError}
        {...getOverrideProps(overrides, "raceResultsProvider")}
      ></TextField>
      <TextField
        label="Original post id"
        isRequired={false}
        isReadOnly={false}
        value={originalPostId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              gpxFile,
              images,
              headerImage,
              date,
              publishedDate,
              location,
              postLocation,
              stravaUrl,
              resultsUrl,
              type,
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              author,
              elevationTotal,
              normalizedPower,
              distance,
              heartAnalysis,
              cadenceAnalysis,
              tempAnalysis,
              elapsedTime,
              stoppedTime,
              timeInRed,
              powerZones,
              timeSeriesFile,
              powerZoneBuckets,
              createdAt,
              heroImage,
              subhead,
              shortUrl,
              raceResults,
              webscorerResults,
              crossResults,
              omniResults,
              runSignupResults,
              raceResultsProvider,
              originalPostId: value,
            };
            const result = onChange(modelFields);
            value = result?.originalPostId ?? value;
          }
          if (errors.originalPostId?.hasError) {
            runValidationTasks("originalPostId", value);
          }
          setOriginalPostId(value);
        }}
        onBlur={() => runValidationTasks("originalPostId", originalPostId)}
        errorMessage={errors.originalPostId?.errorMessage}
        hasError={errors.originalPostId?.hasError}
        {...getOverrideProps(overrides, "originalPostId")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
