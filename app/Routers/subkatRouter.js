"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subkatRouter = void 0;
const baseRouter_1 = __importDefault(require("./baseRouter"));
const subkatService_1 = __importDefault(require("../Services/subkatService"));
class subkatRouter extends baseRouter_1.default {
    routing(rt) {
        rt.get("/", subkatService_1.default.index);
        rt.get("/hapus/:u", subkatService_1.default.delete);
        rt.get("/:u", subkatService_1.default.find);
        rt.post("/tambah", subkatService_1.default.create);
        rt.post("/ubah/:u", subkatService_1.default.update);
    }
}
exports.subkatRouter = subkatRouter;
