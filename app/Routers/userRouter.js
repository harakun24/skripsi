"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const baseRouter_1 = __importDefault(require("./baseRouter"));
const userService_1 = __importDefault(require("../Services/userService"));
class userRouter extends baseRouter_1.default {
    routing(rt) {
        rt.get("/", userService_1.default.index);
        rt.get("/id/:u", userService_1.default.find);
        rt.post("/auth", userService_1.default.proses);
        rt.post("/tambah", userService_1.default.create);
        rt.post("/ubah/:u", userService_1.default.update);
        rt.get("/hapus/:u", userService_1.default.delete);
    }
}
exports.userRouter = userRouter;
