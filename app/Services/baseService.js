"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
const modelCollector_1 = __importDefault(require("../Models/modelCollector"));
require("colors");
class baseService {
    constructor() {
        console.log(`[service]`.yellow + ` ${this.constructor.name}   ` + `\t | `.yellow + `invoked! `.green + "|".yellow);
        const listMethod = Object.getOwnPropertyNames(this.constructor.prototype);
        for (const list of listMethod) {
            this[list] = this[list].bind(this);
        }
    }
    base(req) {
        return req.protocol + "://" + req.get("host");
    }
    auth(req, res) {
    }
}
baseService.model = new modelCollector_1.default().Tables("all");
exports.default = baseService;
const { model } = baseService;
exports.model = model;
