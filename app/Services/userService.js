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
const axios_1 = __importDefault(require("axios"));
class userService extends baseService_1.default {
    async index(req, res) {
        this.auth(req, res);
        res.render("user", {
            title: "pengurus",
            kside: await baseService_1.model.kategori.findAll(),
            dside: await baseService_1.model.subkategori.findAll({ where: { fk_kategori: 3 } }),
            pengurus: await baseService_1.model.user.findAll(),
            user: req.session.user,
            layout: "admin",
            info: req.flash("info"),
        });
    }
    async find(req, res) {
        const de = (0, express_1.env)();
        const user = await baseService_1.model.user.findOne({ where: { id_user: req.params.u } });
        const key = de["salt_bitter"] + user.username;
        user.password = crypto_js_1.default.Rabbit.decrypt(user.password, key).toString(crypto_js_1.default.enc.Utf8);
        res.send(user || {});
    }
    async findAll(req, res) {
        try {
            res.send(await baseService_1.model.user.findAll());
        }
        catch (error) {
            console.log(error);
        }
    }
    async create(req, res) {
        const de = (0, express_1.env)();
        if (!req.body.username) {
            req.flash("info", "failed");
            res.redirect("/pengurus");
        }
        else {
            const key = de["salt_bitter"] + req.body.username;
            const baru = {
                username: req.body.username,
                password: crypto_js_1.default.Rabbit.encrypt(req.body.password, key).toString(),
            };
            try {
                await baseService_1.model.user.create(baru);
                req.flash("info", "add");
                res.redirect("/pengurus");
            }
            catch (err) {
                req.flash("info", "failed");
                res.redirect("/pengurus");
            }
        }
    }
    async update(req, res) {
        try {
            const de = (0, express_1.env)();
            const key = de["salt_bitter"] + req.body.username;
            req.body.password = crypto_js_1.default.Rabbit.encrypt(req.body.password, key).toString();
            await baseService_1.model.user.update(req.body, { where: { id_user: req.params.u } });
            req.flash("info", "edit");
            res.redirect("/pengurus");
        }
        catch (err) {
            req.flash("info", "failed");
            res.redirect("/pengurus");
        }
    }
    async delete(req, res) {
        try {
            await baseService_1.model.user.destroy({ where: { id_user: req.params.u } });
            req.flash("info", "del");
            res.redirect("/pengurus");
        }
        catch (error) {
            req.flash("info", "failed");
            res.redirect("/pengurus");
        }
    }
    async proses(req, res) {
        const phase1 = await baseService_1.model.user.findOne({
            where: { username: req.body.username },
        });
        if (phase1) {
            const phase2 = (await axios_1.default.get(this.base(req) + "/pengurus/id/" + phase1.dataValues.id_user)).data;
            if (phase2.password == req.body.password) {
                phase2.type = "admin";
                req.session.user = phase2;
                req.flash("info", "login");
            }
            else {
                if (!(await this.visitor(req, res)))
                    req.flash("info", "failed");
            }
        }
        else {
            if (!(await this.visitor(req, res)))
                req.flash("info", "failed");
        }
        res.redirect("/");
    }
    async visitor(req, res) {
        let state = false;
        const phase1 = await baseService_1.model.visitor.findOne({
            where: { nim: req.body.username },
        });
        console.log("phase1");
        if (phase1) {
            const phase2 = (await axios_1.default.get(this.base(req) + "/visitor/id/" + phase1.dataValues.id_visitor)).data;
            console.log("phase2 " + (phase2.password == req.body.password));
            if (phase2.password == req.body.password) {
                phase2.type = "user";
                req.session.user = phase2;
                state = true;
            }
        }
        return state;
    }
}
require("colors");
console.log("Table services:".yellow);
console.log("--------------------------------------------".yellow);
exports.default = new userService();
