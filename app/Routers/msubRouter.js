"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.msubRouter = void 0;
const baseRouter_1 = __importDefault(require("./baseRouter"));
const msubService_1 = __importDefault(require("../Services/msubService"));
class msubRouter extends baseRouter_1.default {
    routing(rt) {
        rt.get("/:num?", msubService_1.default.index);
        rt.get("/ubah/:m/:u/:n", msubService_1.default.update);
        rt.get("/reset/:u", msubService_1.default.reset);
    }
}
exports.msubRouter = msubRouter;
