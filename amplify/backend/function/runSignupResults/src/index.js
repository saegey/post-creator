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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const { url, category } = event.queryStringParameters;
    const endpoint = new URL(url);
    const raceId = endpoint.pathname.split("/")[3];
    // const context: { categories?: Array<{ id: number; name: string }> } = {};
    try {
        const res = yield (0, node_fetch_1.default)(`https://runsignup.com/Race/Results/${raceId}?resultSetId=${category}&page=1&num=100&search=`, {
            headers: {
                accept: "application/json, */*; q=0.01",
                "accept-language": "en-US,en;q=0.9,it;q=0.8,fr;q=0.7",
                "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"macOS"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                Referer: "https://runsignup.com/Race/Results/86159",
                "Referrer-Policy": "strict-origin-when-cross-origin",
            },
            body: null,
            method: "GET",
        });
        const body = yield res.json();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify(body),
        };
    }
    catch (e) {
        console.log(e);
    }
});
exports.handler = handler;
