"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tanyaRouter = void 0;
const baseRouter_1 = __importDefault(require("./baseRouter"));
const tanyaService_1 = __importDefault(require("../Services/tanyaService"));
class tanyaRouter extends baseRouter_1.default {
    routing(rt) {
        rt.get("/", tanyaService_1.default.index);
        rt.get("/hapus/:u", tanyaService_1.default.delete);
        rt.get("/all", tanyaService_1.default.findAll);
        rt.get("/:u", tanyaService_1.default.find);
        rt.post("/tambah", tanyaService_1.default.create);
        rt.post("/ubah/:u", tanyaService_1.default.update);
    }
}
exports.tanyaRouter = tanyaRouter;
