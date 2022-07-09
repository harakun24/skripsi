"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
const baseRouter_1 = __importDefault(require("./baseRouter"));
const dashboardService_1 = __importDefault(require("../Services/dashboardService"));
class dashboardRouter extends baseRouter_1.default {
    routing(rt) {
        this.router.get("/", dashboardService_1.default.index);
    }
}
exports.dashboardRouter = dashboardRouter;
