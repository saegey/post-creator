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
const cheerio_1 = __importDefault(require("cheerio"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const node_vm_1 = __importDefault(require("node:vm"));
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const { url } = event.queryStringParameters;
    const endpoint = new URL(url);
    const context = {};
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
        const $ = cheerio_1.default.load(body);
        const scripts = $('script:contains("EventClasses")').text();
        node_vm_1.default.createContext(context);
        node_vm_1.default.runInContext(scripts, context);
    }
    catch (e) {
        console.log(e);
    }
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({
            eventClasses: context.OmniGo.event.EventClasses,
            eventRoutes: context.OmniGo.event.EventRoutes,
            checkpoints: context.OmniGo.event.checkpoints,
            city: context.OmniGo.event.city,
            date: context.OmniGo.event.date,
            image: context.OmniGo.event.img,
            name: context.OmniGo.event.name,
            state: context.OmniGo.event.state,
        }),
    };
});
exports.handler = handler;
