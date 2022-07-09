"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.Router = exports.App = void 0;
const express_1 = __importStar(require("express"));
Object.defineProperty(exports, "Router", { enumerable: true, get: function () { return express_1.Router; } });
const dotenv_1 = require("dotenv");
const modelCollector_1 = require("../Models/modelCollector");
const os_1 = __importDefault(require("os"));
(0, dotenv_1.config)({ path: ".env" });
class App {
    constructor(callBack = (port, opt = []) => console.log(`run in port: ${port}`)) {
        this.app = (0, express_1.default)();
        const iface = os_1.default.networkInterfaces();
        const ip = [];
        for (const i in iface) {
            for (const j of iface[i]) {
                if (j.family != "IPv6")
                    ip.push(j);
            }
        }
        console.log();
        const port = process.env.PORT ?? 5000;
        console.log("");
        this.app.listen(port, callBack(port, ip));
        console.log("");
    }
    route(path, callback) {
        const router = (0, express_1.Router)();
        callback(router);
        this.app.use(path, router);
    }
    static(virtual, path) {
        this.app.use(virtual, express_1.default.static(path));
    }
    setViews(path) {
        this.app.set("views", path);
    }
    engine(lang, opt1, opt2) {
        this.app.set("view engine", lang);
        if (opt1) {
            this.app.engine(opt1, opt2);
        }
    }
    use(...opt) {
        this.app.use(...opt);
    }
    sync(opt = {}) {
        require("colors");
        modelCollector_1.driver.connect
            .sync(opt)
            .then(() => {
            console.log("\nterhubung ke ".green + `db--${process.env["db_env"]}--`.cyan);
        })
            .catch((e) => {
            console.log(`terjadi masalah dengan database... `);
            const reset = () => {
                this.sync(opt);
            };
            setTimeout(reset, 1800);
        });
    }
}
exports.App = App;
App.ex = express_1.default;
const env = () => {
    (0, dotenv_1.config)({ path: ".env" });
    return process.env;
};
exports.env = env;
