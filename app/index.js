"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("./Helper/express");
const routerCollector_1 = require("./Routers/routerCollector");
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const express_flash_1 = __importDefault(require("express-flash"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = new express_1.App((port, opt) => {
    console.log("server berjalan");
    require("colors");
    console.log(`silahkan akses `.magenta + ` http://localhost:${port}/`.cyan);
    for (const o of opt) {
        console.log(`silahkan akses `.magenta + ` http://${o.address}:${port}/`.cyan);
    }
});
app.sync();
app.use(express_1.App.ex.json());
app.use(express_1.App.ex.urlencoded({ extended: true }));
app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({ secret: "something", resave: false, saveUninitialized: true }));
app.use((0, express_flash_1.default)());
app.static("/assets", "public");
app.engine("hbs", ".hbs", (0, express_handlebars_1.default)({
    extname: ".hbs",
    defaultLayout: false,
    partialsDir: "./Views/components",
    layoutsDir: "./Views/template",
}));
app.setViews("./Views");
app.use((0, morgan_1.default)("dev"));
app.route("/", (router) => {
    router.use("/", routerCollector_1.router);
    router.get("/logout", (req, res) => {
        delete req.session.user;
        res.redirect("/");
    });
    router.use((req, res) => {
        res.render("404");
    });
});
