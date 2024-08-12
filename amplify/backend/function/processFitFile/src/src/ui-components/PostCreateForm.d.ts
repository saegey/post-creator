/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PostCreateFormInputValues = {
    type?: string;
    title?: string;
    gpxFile?: string;
    images?: string;
    headerImage?: string;
    date?: string;
    publishedDate?: string;
    location?: string;
    postLocation?: string;
    stravaUrl?: string;
    resultsUrl?: string;
    timeSeriesFile?: string;
    subType?: string;
    teaser?: string;
    currentFtp?: string;
    components?: string;
    elevationTotal?: number;
    normalizedPower?: number;
    distance?: number;
    heartAnalysis?: string;
    cadenceAnalysis?: string;
    tempAnalysis?: string;
    elapsedTime?: number;
    stoppedTime?: number;
    timeInRed?: number;
    powerZones?: string;
    powerZoneBuckets?: string;
    createdAt?: string;
    heroImage?: string;
    subhead?: string;
    shortUrl?: string;
    raceResults?: string;
    webscorerResults?: string;
    crossResults?: string;
    omniResults?: string;
    runSignupResults?: string;
    raceResultsProvider?: string;
    privacyStatus?: string;
};
export declare type PostCreateFormValidationValues = {
    type?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    gpxFile?: ValidationFunction<string>;
    images?: ValidationFunction<string>;
    headerImage?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    publishedDate?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
    postLocation?: ValidationFunction<string>;
    stravaUrl?: ValidationFunction<string>;
    resultsUrl?: ValidationFunction<string>;
    timeSeriesFile?: ValidationFunction<string>;
    subType?: ValidationFunction<string>;
    teaser?: ValidationFunction<string>;
    currentFtp?: ValidationFunction<string>;
    components?: ValidationFunction<string>;
    elevationTotal?: ValidationFunction<number>;
    normalizedPower?: ValidationFunction<number>;
    distance?: ValidationFunction<number>;
    heartAnalysis?: ValidationFunction<string>;
    cadenceAnalysis?: ValidationFunction<string>;
    tempAnalysis?: ValidationFunction<string>;
    elapsedTime?: ValidationFunction<number>;
    stoppedTime?: ValidationFunction<number>;
    timeInRed?: ValidationFunction<number>;
    powerZones?: ValidationFunction<string>;
    powerZoneBuckets?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    heroImage?: ValidationFunction<string>;
    subhead?: ValidationFunction<string>;
    shortUrl?: ValidationFunction<string>;
    raceResults?: ValidationFunction<string>;
    webscorerResults?: ValidationFunction<string>;
    crossResults?: ValidationFunction<string>;
    omniResults?: ValidationFunction<string>;
    runSignupResults?: ValidationFunction<string>;
    raceResultsProvider?: ValidationFunction<string>;
    privacyStatus?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostCreateFormOverridesProps = {
    PostCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    gpxFile?: PrimitiveOverrideProps<TextFieldProps>;
    images?: PrimitiveOverrideProps<TextAreaFieldProps>;
    headerImage?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    publishedDate?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    postLocation?: PrimitiveOverrideProps<TextFieldProps>;
    stravaUrl?: PrimitiveOverrideProps<TextFieldProps>;
    resultsUrl?: PrimitiveOverrideProps<TextFieldProps>;
    timeSeriesFile?: PrimitiveOverrideProps<TextFieldProps>;
    subType?: PrimitiveOverrideProps<TextFieldProps>;
    teaser?: PrimitiveOverrideProps<TextFieldProps>;
    currentFtp?: PrimitiveOverrideProps<TextFieldProps>;
    components?: PrimitiveOverrideProps<TextAreaFieldProps>;
    elevationTotal?: PrimitiveOverrideProps<TextFieldProps>;
    normalizedPower?: PrimitiveOverrideProps<TextFieldProps>;
    distance?: PrimitiveOverrideProps<TextFieldProps>;
    heartAnalysis?: PrimitiveOverrideProps<TextAreaFieldProps>;
    cadenceAnalysis?: PrimitiveOverrideProps<TextAreaFieldProps>;
    tempAnalysis?: PrimitiveOverrideProps<TextAreaFieldProps>;
    elapsedTime?: PrimitiveOverrideProps<TextFieldProps>;
    stoppedTime?: PrimitiveOverrideProps<TextFieldProps>;
    timeInRed?: PrimitiveOverrideProps<TextFieldProps>;
    powerZones?: PrimitiveOverrideProps<TextAreaFieldProps>;
    powerZoneBuckets?: PrimitiveOverrideProps<TextAreaFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    heroImage?: PrimitiveOverrideProps<TextAreaFieldProps>;
    subhead?: PrimitiveOverrideProps<TextFieldProps>;
    shortUrl?: PrimitiveOverrideProps<TextFieldProps>;
    raceResults?: PrimitiveOverrideProps<TextAreaFieldProps>;
    webscorerResults?: PrimitiveOverrideProps<TextAreaFieldProps>;
    crossResults?: PrimitiveOverrideProps<TextAreaFieldProps>;
    omniResults?: PrimitiveOverrideProps<TextAreaFieldProps>;
    runSignupResults?: PrimitiveOverrideProps<TextAreaFieldProps>;
    raceResultsProvider?: PrimitiveOverrideProps<TextFieldProps>;
    privacyStatus?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PostCreateFormProps = React.PropsWithChildren<{
    overrides?: PostCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PostCreateFormInputValues) => PostCreateFormInputValues;
    onSuccess?: (fields: PostCreateFormInputValues) => void;
    onError?: (fields: PostCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostCreateFormInputValues) => PostCreateFormInputValues;
    onValidate?: PostCreateFormValidationValues;
} & React.CSSProperties>;
export default function PostCreateForm(props: PostCreateFormProps): React.ReactElement;
