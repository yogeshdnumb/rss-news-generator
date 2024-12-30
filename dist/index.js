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
const rss_parser_1 = __importDefault(require("rss-parser"));
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
const parser = new rss_parser_1.default();
const urls = [
    ["https://news.ycombinator.com/rss", "hackerNews"],
    ["https://feeds.arstechnica.com/arstechnica/index/", "ArtsTechnica"],
];
function rssToJson(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield parser.parseURL(url);
        return data;
    });
}
function writeToFile(filename, content) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, promises_1.writeFile)(node_path_1.default.join(__dirname + "/../feeds" + `/${filename}.json`), content);
    });
}
urls.forEach((data) => __awaiter(void 0, void 0, void 0, function* () {
    const url = data[0];
    const filename = data[1];
    const content = yield rssToJson(url);
    yield writeToFile(filename, JSON.stringify(content));
}));
