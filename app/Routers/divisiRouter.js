"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.divisiRouter = void 0;
const baseRouter_1 = __importDefault(require("./baseRouter"));
const divisiService_1 = __importDefault(require("../Services/divisiService"));
class divisiRouter extends baseRouter_1.default {
    routing(rt) {
        rt.get("/", divisiService_1.default.index);
        rt.get("/hapus/:u", divisiService_1.default.delete);
        rt.get("/all", divisiService_1.default.findAll);
        rt.get("/:u", divisiService_1.default.find);
        rt.post("/tambah", divisiService_1.default.create);
        rt.post("/ubah/:u", divisiService_1.default.update);
    }
}
exports.divisiRouter = divisiRouter;
