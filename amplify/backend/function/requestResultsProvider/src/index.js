"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const octokit_1 = require("octokit");
const client_ssm_1 = require("@aws-sdk/client-ssm");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body } = JSON.parse(event.body);
    console.log(event.body, title, body);
    try {
        const client = new client_ssm_1.SSMClient();
        const input = {
            // GetParametersRequest
            Name: process.env["GITHUB_TOKEN"],
            WithDecryption: true,
        };
        const command = new client_ssm_1.GetParameterCommand(input);
        const response = yield client.send(command);
        const GITHUB_TOKEN = response.Parameter.Value;
        // Octokit.js
        // https://github.com/octokit/core.js#readme
        // https://github.com/saegey/post-creator
        const octokit = new octokit_1.Octokit({
            auth: GITHUB_TOKEN,
        });
        const res = yield octokit.request("POST /repos/saegey/post-creator/issues", {
            owner: "saegey",
            repo: "post-creator",
            title: title,
            body: JSON.stringify(body),
            assignees: ["saegey"],
            labels: ["request"],
            headers: {
                "X-GitHub-Api-Version": "2022-11-28",
            },
        });
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify(res),
        };
    }
    catch (e) {
        console.log(e);
    }
});
exports.handler = handler;
