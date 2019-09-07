"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main_1 = require("./routes/main");
exports.app = express_1.default();
const bodyParser = __importStar(require("body-parser"));
exports.app.use(bodyParser.text({ type: 'text/html' }));
exports.app.use('/', main_1._router);
exports.app.listen(5000, () => console.log("Hi There, It's me 5000 ;;;;"));
