"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jawabRouter = void 0;
const baseRouter_1 = __importDefault(require("./baseRouter"));
const jawabService_1 = __importDefault(require("../Services/jawabService"));
class jawabRouter extends baseRouter_1.default {
    routing(rt) {
        rt.get("/hapus/:u", jawabService_1.default.delete);
        rt.get("/all", jawabService_1.default.findAll);
        rt.get("/:u", jawabService_1.default.find);
        rt.post("/tambah", jawabService_1.default.create);
        rt.post("/ubah/:u", jawabService_1.default.update);
    }
}
exports.jawabRouter = jawabRouter;
