"use strict";
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var cheerio_1 = __importDefault(require("cheerio"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var node_vm_1 = __importDefault(require("node:vm"));
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var url, endpoint, context, requestToBeSigned, response, body, $, scripts, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("EVENT: ".concat(JSON.stringify(event)));
                url = event.queryStringParameters.url;
                endpoint = new URL(url);
                context = {};
                requestToBeSigned = {
                    method: "GET",
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
                    },
                    hostname: endpoint.host,
                    path: endpoint.pathname,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, node_fetch_1.default)(endpoint, requestToBeSigned)];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 3:
                body = _a.sent();
                $ = cheerio_1.default.load(body);
                scripts = $('script:contains("EventClasses")').text();
                node_vm_1.default.createContext(context);
                node_vm_1.default.runInContext(scripts, context);
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, {
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
                }];
        }
    });
}); };
exports.handler = handler;
