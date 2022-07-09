"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitorRouter = void 0;
const baseRouter_1 = __importDefault(require("./baseRouter"));
const visitor_1 = __importDefault(require("../Services/visitor"));
class visitorRouter extends baseRouter_1.default {
    routing(rt) {
        rt.post("/register", visitor_1.default.create);
        rt.post("/ubah/:u", visitor_1.default.update);
        rt.get("/id/:u", visitor_1.default.find);
        rt.get("/nim/:u", visitor_1.default.nim);
        rt.get("/count", visitor_1.default.findAll);
        rt.get("/hapus/:u", visitor_1.default.delete);
    }
}
exports.visitorRouter = visitorRouter;
