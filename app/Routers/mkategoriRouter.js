"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkategoriRouter = void 0;
const baseRouter_1 = __importDefault(require("./baseRouter"));
const mkategoriService_1 = __importDefault(require("../Services/mkategoriService"));
class mkategoriRouter extends baseRouter_1.default {
    routing(rt) {
        rt.get("/", mkategoriService_1.default.index);
        rt.get("/ubah/:u/:n", mkategoriService_1.default.update);
        rt.get("/reset", mkategoriService_1.default.reset);
    }
}
exports.mkategoriRouter = mkategoriRouter;
