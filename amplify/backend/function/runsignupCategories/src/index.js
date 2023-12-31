"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const cheerio = __importStar(require("cheerio"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const { url } = event.queryStringParameters;
    const endpoint = new URL(url);
    // const context: { categories?: Array<{ id: number; name: string }> } = {};
    const requestToBeSigned = {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        },
        hostname: endpoint.host,
        path: endpoint.pathname,
    };
    try {
        const response = yield (0, node_fetch_1.default)(endpoint, requestToBeSigned);
        const body = yield response.text();
        const $ = cheerio.load(body);
        const res = [];
        // const scripts = $("#resultsSelect > .options > a").text();
        $("#resultsSelect > .options > a").each((i, element) => {
            const $element = $(element);
            const textContent = $element.text();
            const cat = $element.find("span").text().replace(/(\s+)/g, " ").trim();
            if ($element.data("value") === undefined) {
                return;
            }
            // Get the text content of the current elementr
            res.push({
                name: textContent.replace(/(\s+)/g, " ").replace(cat, "").trim(),
                id: Number($element.data("value")),
                year: $element.data("year") ? Number($element.data("year")) : undefined,
                category: cat,
            });
        });
        const eventName = $(".websiteFullScreenHeader__name > h1")
            .text()
            .replace("Results For", "")
            .trim();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({
                categories: res,
                eventName,
            }),
        };
    }
    catch (e) {
        console.log(e);
    }
});
exports.handler = handler;
