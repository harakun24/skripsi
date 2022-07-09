"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kategoriRouter = void 0;
const baseRouter_1 = __importDefault(require("./baseRouter"));
const kategoriService_1 = __importDefault(require("../Services/kategoriService"));
class kategoriRouter extends baseRouter_1.default {
    routing(rt) {
        rt.get("/", kategoriService_1.default.index);
        rt.get("/all", kategoriService_1.default.findAll);
        rt.get("/:u", kategoriService_1.default.find);
        rt.post("/tambah", kategoriService_1.default.create);
        rt.post("/ubah/:u", kategoriService_1.default.update);
        rt.get("/hapus/:u", kategoriService_1.default.delete);
    }
}
exports.kategoriRouter = kategoriRouter;
