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
exports.getCheckPoints = exports.getFinishTimes = exports.getResults = exports.getEventMetadata = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const node_vm_1 = __importDefault(require("node:vm"));
const getEventMetadata = ({ url }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const endpoint = new URL(url);
    const context = {};
    try {
        const response = yield fetch(endpoint, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
            },
            // hostname: endpoint.host,
        });
        const body = yield response.text();
        const $ = cheerio_1.default.load(body);
        const scripts = $('script:contains("EventClasses")').text();
        node_vm_1.default.createContext(context);
        node_vm_1.default.runInContext(scripts, context);
        return {
            eventClasses: (_b = (_a = context.OmniGo) === null || _a === void 0 ? void 0 : _a.event) === null || _b === void 0 ? void 0 : _b.EventClasses,
            checkpoints: (_d = (_c = context.OmniGo) === null || _c === void 0 ? void 0 : _c.event) === null || _d === void 0 ? void 0 : _d.checkpoints,
        };
    }
    catch (e) {
        console.log(e);
        return { error: true };
    }
});
exports.getEventMetadata = getEventMetadata;
const getResults = ({ distance, gender, url, }) => __awaiter(void 0, void 0, void 0, function* () {
    // https://api.omnigoevents.com/events/bwr-bc-2023/times?distance=136.2&gender=f
    try {
        const eventSlug = new URL(url).pathname.split("/")[2];
        const res = yield fetch(`https://api.omnigoevents.com/events/${eventSlug}/eventathletes?distance=${distance}&gender=${gender}&fields=id%2CclassId%2Cbib%2CfirstName%2ClastName%2Cteam%2Cadjustment%2CstartTs%2Cstart%2Cstatus`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
            },
            body: null,
            method: "GET",
        });
        const body = (yield res.json());
        return body;
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
});
exports.getResults = getResults;
const getFinishTimes = ({ gender, distance, url, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventSlug = new URL(url).pathname.split("/")[2];
        const res = yield fetch(`https://api.omnigoevents.com/events/${eventSlug}/times?distance=${distance}&gender=${gender}`, {
            headers: {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9,it;q=0.8,fr;q=0.7",
                "if-none-match": 'W/"af1-9KvcJvlGSL5lH99yc9CyQnAOeCQ"',
                "sec-ch-ua": '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"macOS"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                Referer: "https://www.omnigoevents.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin",
            },
            body: null,
            method: "GET",
        });
        const body = (yield res.json());
        return body;
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
});
exports.getFinishTimes = getFinishTimes;
const getCheckPoints = ({ gender, distance, url, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventSlug = new URL(url).pathname.split("/")[2];
        const res = yield fetch(`https://api.omnigoevents.com/events/${eventSlug}/checkpointtimes?distance=${distance}gender=${gender}&asLap=true`, {
            headers: {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9,it;q=0.8,fr;q=0.7",
                "if-none-match": 'W/"1e62c-1kUruNMuMWNygFQRMQ9h23G2MKc"',
                "sec-ch-ua": '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"macOS"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                Referer: "https://www.omnigoevents.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin",
            },
            body: null,
            method: "GET",
        });
        const body = (yield res.json());
        return body;
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
});
exports.getCheckPoints = getCheckPoints;
