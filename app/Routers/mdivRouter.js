"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mdivRouter = void 0;
const baseRouter_1 = __importDefault(require("./baseRouter"));
const mdivService_1 = __importDefault(require("../Services/mdivService"));
class mdivRouter extends baseRouter_1.default {
    routing(rt) {
        rt.get("/:num?", mdivService_1.default.index);
        rt.get("/ubah/:m/:u/:n", mdivService_1.default.update);
        rt.get("/reset/:u", mdivService_1.default.reset);
    }
}
exports.mdivRouter = mdivRouter;
