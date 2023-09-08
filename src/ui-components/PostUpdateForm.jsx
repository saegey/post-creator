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
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { getPost } from "../graphql/queries";
import { updatePost } from "../graphql/mutations";
export default function PostUpdateForm(props) {
  const {
    id: idProp,
    post: postModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    type: "",
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
    subType: "",
    teaser: "",
    currentFtp: "",
    components: "",
    powerAnalysis: "",
    coordinates: "",
    powers: "",
    elevation: "",
    elevationGrades: "",
    distances: "",
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
    powerZoneBuckets: "",
    createdAt: "",
    heroImage: "",
  };
  const [type, setType] = React.useState(initialValues.type);
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
  const [subType, setSubType] = React.useState(initialValues.subType);
  const [teaser, setTeaser] = React.useState(initialValues.teaser);
  const [currentFtp, setCurrentFtp] = React.useState(initialValues.currentFtp);
  const [components, setComponents] = React.useState(initialValues.components);
  const [powerAnalysis, setPowerAnalysis] = React.useState(
    initialValues.powerAnalysis
  );
  const [coordinates, setCoordinates] = React.useState(
    initialValues.coordinates
  );
  const [powers, setPowers] = React.useState(initialValues.powers);
  const [elevation, setElevation] = React.useState(initialValues.elevation);
  const [elevationGrades, setElevationGrades] = React.useState(
    initialValues.elevationGrades
  );
  const [distances, setDistances] = React.useState(initialValues.distances);
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
  const [powerZoneBuckets, setPowerZoneBuckets] = React.useState(
    initialValues.powerZoneBuckets
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [heroImage, setHeroImage] = React.useState(initialValues.heroImage);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = postRecord
      ? { ...initialValues, ...postRecord }
      : initialValues;
    setType(cleanValues.type);
    setTitle(cleanValues.title);
    setGpxFile(cleanValues.gpxFile);
    setImages(
      typeof cleanValues.images === "string" || cleanValues.images === null
        ? cleanValues.images
        : JSON.stringify(cleanValues.images)
    );
    setHeaderImage(cleanValues.headerImage);
    setDate(cleanValues.date);
    setPublishedDate(cleanValues.publishedDate);
    setLocation(cleanValues.location);
    setPostLocation(cleanValues.postLocation);
    setStravaUrl(cleanValues.stravaUrl);
    setResultsUrl(cleanValues.resultsUrl);
    setSubType(cleanValues.subType);
    setTeaser(cleanValues.teaser);
    setCurrentFtp(cleanValues.currentFtp);
    setComponents(
      typeof cleanValues.components === "string" ||
        cleanValues.components === null
        ? cleanValues.components
        : JSON.stringify(cleanValues.components)
    );
    setPowerAnalysis(
      typeof cleanValues.powerAnalysis === "string" ||
        cleanValues.powerAnalysis === null
        ? cleanValues.powerAnalysis
        : JSON.stringify(cleanValues.powerAnalysis)
    );
    setCoordinates(
      typeof cleanValues.coordinates === "string" ||
        cleanValues.coordinates === null
        ? cleanValues.coordinates
        : JSON.stringify(cleanValues.coordinates)
    );
    setPowers(
      typeof cleanValues.powers === "string" || cleanValues.powers === null
        ? cleanValues.powers
        : JSON.stringify(cleanValues.powers)
    );
    setElevation(
      typeof cleanValues.elevation === "string" ||
        cleanValues.elevation === null
        ? cleanValues.elevation
        : JSON.stringify(cleanValues.elevation)
    );
    setElevationGrades(
      typeof cleanValues.elevationGrades === "string" ||
        cleanValues.elevationGrades === null
        ? cleanValues.elevationGrades
        : JSON.stringify(cleanValues.elevationGrades)
    );
    setDistances(
      typeof cleanValues.distances === "string" ||
        cleanValues.distances === null
        ? cleanValues.distances
        : JSON.stringify(cleanValues.distances)
    );
    setElevationTotal(cleanValues.elevationTotal);
    setNormalizedPower(cleanValues.normalizedPower);
    setDistance(cleanValues.distance);
    setHeartAnalysis(
      typeof cleanValues.heartAnalysis === "string" ||
        cleanValues.heartAnalysis === null
        ? cleanValues.heartAnalysis
        : JSON.stringify(cleanValues.heartAnalysis)
    );
    setCadenceAnalysis(
      typeof cleanValues.cadenceAnalysis === "string" ||
        cleanValues.cadenceAnalysis === null
        ? cleanValues.cadenceAnalysis
        : JSON.stringify(cleanValues.cadenceAnalysis)
    );
    setTempAnalysis(
      typeof cleanValues.tempAnalysis === "string" ||
        cleanValues.tempAnalysis === null
        ? cleanValues.tempAnalysis
        : JSON.stringify(cleanValues.tempAnalysis)
    );
    setElapsedTime(cleanValues.elapsedTime);
    setStoppedTime(cleanValues.stoppedTime);
    setTimeInRed(cleanValues.timeInRed);
    setPowerZones(
      typeof cleanValues.powerZones === "string" ||
        cleanValues.powerZones === null
        ? cleanValues.powerZones
        : JSON.stringify(cleanValues.powerZones)
    );
    setPowerZoneBuckets(
      typeof cleanValues.powerZoneBuckets === "string" ||
        cleanValues.powerZoneBuckets === null
        ? cleanValues.powerZoneBuckets
        : JSON.stringify(cleanValues.powerZoneBuckets)
    );
    setCreatedAt(cleanValues.createdAt);
    setHeroImage(
      typeof cleanValues.heroImage === "string" ||
        cleanValues.heroImage === null
        ? cleanValues.heroImage
        : JSON.stringify(cleanValues.heroImage)
    );
    setErrors({});
  };
  const [postRecord, setPostRecord] = React.useState(postModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getPost,
              variables: { id: idProp },
            })
          )?.data?.getPost
        : postModelProp;
      setPostRecord(record);
    };
    queryData();
  }, [idProp, postModelProp]);
  React.useEffect(resetStateValues, [postRecord]);
  const validations = {
    type: [{ type: "Required" }],
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
    subType: [],
    teaser: [],
    currentFtp: [],
    components: [{ type: "JSON" }],
    powerAnalysis: [{ type: "JSON" }],
    coordinates: [{ type: "JSON" }],
    powers: [{ type: "JSON" }],
    elevation: [{ type: "JSON" }],
    elevationGrades: [{ type: "JSON" }],
    distances: [{ type: "JSON" }],
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
    powerZoneBuckets: [{ type: "JSON" }],
    createdAt: [{ type: "Required" }],
    heroImage: [{ type: "JSON" }],
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
          type,
          title,
          gpxFile: gpxFile ?? null,
          images: images ?? null,
          headerImage: headerImage ?? null,
          date: date ?? null,
          publishedDate: publishedDate ?? null,
          location: location ?? null,
          postLocation: postLocation ?? null,
          stravaUrl: stravaUrl ?? null,
          resultsUrl: resultsUrl ?? null,
          subType: subType ?? null,
          teaser: teaser ?? null,
          currentFtp: currentFtp ?? null,
          components: components ?? null,
          powerAnalysis: powerAnalysis ?? null,
          coordinates: coordinates ?? null,
          powers: powers ?? null,
          elevation: elevation ?? null,
          elevationGrades: elevationGrades ?? null,
          distances: distances ?? null,
          elevationTotal: elevationTotal ?? null,
          normalizedPower: normalizedPower ?? null,
          distance: distance ?? null,
          heartAnalysis: heartAnalysis ?? null,
          cadenceAnalysis: cadenceAnalysis ?? null,
          tempAnalysis: tempAnalysis ?? null,
          elapsedTime: elapsedTime ?? null,
          stoppedTime: stoppedTime ?? null,
          timeInRed: timeInRed ?? null,
          powerZones: powerZones ?? null,
          powerZoneBuckets: powerZoneBuckets ?? null,
          createdAt,
          heroImage: heroImage ?? null,
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
            query: updatePost,
            variables: {
              input: {
                id: postRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PostUpdateForm")}
      {...rest}
    >
      <TextField
        label="Type"
        isRequired={true}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type: value,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
        value={images}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
        label="Sub type"
        isRequired={false}
        isReadOnly={false}
        value={subType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType: value,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser: value,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser,
              currentFtp: value,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
        value={components}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType,
              teaser,
              currentFtp,
              components: value,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
        value={powerAnalysis}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis: value,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
        label="Coordinates"
        isRequired={false}
        isReadOnly={false}
        value={coordinates}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates: value,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
            };
            const result = onChange(modelFields);
            value = result?.coordinates ?? value;
          }
          if (errors.coordinates?.hasError) {
            runValidationTasks("coordinates", value);
          }
          setCoordinates(value);
        }}
        onBlur={() => runValidationTasks("coordinates", coordinates)}
        errorMessage={errors.coordinates?.errorMessage}
        hasError={errors.coordinates?.hasError}
        {...getOverrideProps(overrides, "coordinates")}
      ></TextAreaField>
      <TextAreaField
        label="Powers"
        isRequired={false}
        isReadOnly={false}
        value={powers}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers: value,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
            };
            const result = onChange(modelFields);
            value = result?.powers ?? value;
          }
          if (errors.powers?.hasError) {
            runValidationTasks("powers", value);
          }
          setPowers(value);
        }}
        onBlur={() => runValidationTasks("powers", powers)}
        errorMessage={errors.powers?.errorMessage}
        hasError={errors.powers?.hasError}
        {...getOverrideProps(overrides, "powers")}
      ></TextAreaField>
      <TextAreaField
        label="Elevation"
        isRequired={false}
        isReadOnly={false}
        value={elevation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation: value,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
            };
            const result = onChange(modelFields);
            value = result?.elevation ?? value;
          }
          if (errors.elevation?.hasError) {
            runValidationTasks("elevation", value);
          }
          setElevation(value);
        }}
        onBlur={() => runValidationTasks("elevation", elevation)}
        errorMessage={errors.elevation?.errorMessage}
        hasError={errors.elevation?.hasError}
        {...getOverrideProps(overrides, "elevation")}
      ></TextAreaField>
      <TextAreaField
        label="Elevation grades"
        isRequired={false}
        isReadOnly={false}
        value={elevationGrades}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades: value,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
            };
            const result = onChange(modelFields);
            value = result?.elevationGrades ?? value;
          }
          if (errors.elevationGrades?.hasError) {
            runValidationTasks("elevationGrades", value);
          }
          setElevationGrades(value);
        }}
        onBlur={() => runValidationTasks("elevationGrades", elevationGrades)}
        errorMessage={errors.elevationGrades?.errorMessage}
        hasError={errors.elevationGrades?.hasError}
        {...getOverrideProps(overrides, "elevationGrades")}
      ></TextAreaField>
      <TextAreaField
        label="Distances"
        isRequired={false}
        isReadOnly={false}
        value={distances}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances: value,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
            };
            const result = onChange(modelFields);
            value = result?.distances ?? value;
          }
          if (errors.distances?.hasError) {
            runValidationTasks("distances", value);
          }
          setDistances(value);
        }}
        onBlur={() => runValidationTasks("distances", distances)}
        errorMessage={errors.distances?.errorMessage}
        hasError={errors.distances?.hasError}
        {...getOverrideProps(overrides, "distances")}
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
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
        value={heartAnalysis}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
        value={cadenceAnalysis}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
        value={tempAnalysis}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
        value={powerZones}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage,
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
      <TextAreaField
        label="Power zone buckets"
        isRequired={false}
        isReadOnly={false}
        value={powerZoneBuckets}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets: value,
              createdAt,
              heroImage,
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
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt: value,
              heroImage,
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
        value={heroImage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
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
              subType,
              teaser,
              currentFtp,
              components,
              powerAnalysis,
              coordinates,
              powers,
              elevation,
              elevationGrades,
              distances,
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
              powerZoneBuckets,
              createdAt,
              heroImage: value,
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
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || postModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || postModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
