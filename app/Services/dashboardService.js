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
const express_1 = require("../Helper/express");
const baseService_1 = __importStar(require("./baseService"));
const crypto_js_1 = __importDefault(require("crypto-js"));
class dashboardService extends baseService_1.default {
    async index(req, res) {
        this.auth(req, res);
        const pengunjung = await baseService_1.model.visitor.findAll();
        const de = (0, express_1.env)();
        for (const p in pengunjung) {
            const pei = pengunjung[p].dataValues;
            const key = de["salt_bitter"] + pei.nim;
            pei.password = crypto_js_1.default.Rabbit.decrypt(pei.password, key).toString(crypto_js_1.default.enc.Utf8);
            pengunjung[p] = pei;
        }
        if (req.session.user?.type == "admin")
            res.render("admin", {
                title: "dashboard",
                info: req.flash("info"),
                divisi: await baseService_1.model.divisi.count(),
                kategori: await baseService_1.model.kategori.count(),
                subkategori: await baseService_1.model.subkategori.count(),
                visitor: await baseService_1.model.visitor.count(),
                kside: await baseService_1.model.kategori.findAll(),
                dside: await baseService_1.model.subkategori.findAll({ where: { fk_kategori: 3 } }),
                pengunjung,
                user: req.session.user,
                layout: "admin",
            });
        else if (req.session.user?.type == "user")
            res.render("visitor", {
                title: "dashboard",
                info: req.flash("info"),
                user: req.session.user,
                layout: "user",
            });
    }
    find(req, res) {
        res.sendStatus(200);
    }
    findAll(req, res) {
        res.sendStatus(200);
    }
    create(req, res) {
        res.sendStatus(200);
    }
    update(req, res) {
        res.sendStatus(200);
    }
    delete(req, res) {
        res.sendStatus(200);
    }
}
exports.default = new dashboardService();
