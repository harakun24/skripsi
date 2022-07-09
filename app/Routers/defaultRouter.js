"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRouter = void 0;
const baseRouter_1 = __importDefault(require("./baseRouter"));
class defaultRouter extends baseRouter_1.default {
    routing(rt) {
        this.router.get("/", (req, res) => {
            if (req.session.user) {
                req.flash("info", `${req.flash("info")}`);
                res.redirect("/dashboard");
            }
            else
                res.render("main", {
                    layout: "main",
                    title: "web info",
                    info: req.flash("info"),
                });
        });
    }
}
exports.defaultRouter = defaultRouter;
