"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
function printCount(fileName) {
    var jsonFile = fs.readFileSync("./" + fileName, 'utf8');
    var jsonData = JSON.parse(jsonFile);
    var entries = jsonData.log.entries;
    var connectionUrlListMap = entries.reduce(function (pv, c, idx, arr) {
        var _a;
        var urlList = (_a = pv.get(c.connection)) !== null && _a !== void 0 ? _a : new Set();
        pv.set(c.connection, urlList.add(c.request.url));
        return pv;
    }, new Map());
    var resourceCount = Array.from(connectionUrlListMap.values()).reduce(function (p, c, idx, arr) {
        return p + c.size;
    }, 0);
    console.info(fileName + " => the number of connections: " + Array.from(connectionUrlListMap.keys()).length + ". the number of resources: " + resourceCount);
}
[
    'www.naver.com.har',
    'computer.cnu.ac.kr.har',
    'www.ucdavis.edu.har',
    'us.france.fr.har',
    'www5.usp.br.har',
].forEach(function (v) { return printCount(v); });
