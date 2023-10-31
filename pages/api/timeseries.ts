import { NextApiRequest, NextApiResponse } from "next";
import { Slate, Editable, withReact } from "slate-react";
import { API, graphqlOperation, Storage, Amplify } from "aws-amplify";
import {
  CustomEditor,
  CustomElement,
  CloudinaryImage,
  TimeSeriesDataType,
} from "../../src/types/common";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req.query.timeSeriesFile", req.query.timeSeriesFile);
  const result = await Storage.get(req.query.timeSeriesFile, {
    download: true,
    // bucket: "s3-object-lambda-access-point",
    level: "public",
  });
  const timeSeriesData = (await new Response(
    result.Body
  ).json()) as TimeSeriesDataType;

  res.status(200).json({ timeSeriesData });
};

export default handler;
