"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../config/connect"));
require("colors");
class baseModel {
    define(name, data, option = {}) {
        const res = baseModel.connect.define(name, data, option);
        console.log(`[model]`.green + ` ${name}   ` + ` \t\t |`.cyan + ` generated `.green + "|".cyan);
        return res;
    }
}
baseModel.connect = connect_1.default.connect;
exports.default = baseModel;
