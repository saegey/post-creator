import { APIGatewayProxyEvent } from "aws-lambda";
import { Octokit } from "octokit";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

export const handler = async (event: APIGatewayProxyEvent) => {

  const { title, body } = JSON.parse(event.body) as {
    title: string;
    body: {
      url: string;
    };
  };

  console.log(event.body, title, body);
  try {
    const client = new SSMClient();
    const input = {
      // GetParametersRequest
      Name: process.env["GITHUB_TOKEN"],
      WithDecryption: true,
    };
    const command = new GetParameterCommand(input);
    const response = await client.send(command);
    const GITHUB_TOKEN = response.Parameter.Value;

    // Octokit.js
    // https://github.com/octokit/core.js#readme
    // https://github.com/saegey/post-creator
    const octokit = new Octokit({
      auth: GITHUB_TOKEN,
    });

    const res = await octokit.request(
      "POST /repos/saegey/post-creator/issues",
      {
        owner: "saegey",
        repo: "post-creator",
        title: title,
        body: JSON.stringify(body),
        assignees: ["saegey"],
        labels: ["request"],
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(res),
    };
  } catch (e) {
    console.log(e);
  }
};
