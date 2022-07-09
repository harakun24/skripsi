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
class visitorService extends baseService_1.default {
    index(req, res) {
        res.send("visitor service");
    }
    async find(req, res) {
        try {
            const de = (0, express_1.env)();
            const visitor = await baseService_1.model.visitor.findByPk(req.params.u);
            const key = de["salt_bitter"] + visitor.dataValues.nim;
            visitor.dataValues.password = crypto_js_1.default.Rabbit.decrypt(visitor.dataValues.password, key).toString(crypto_js_1.default.enc.Utf8);
            res.send(visitor || {});
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ ps: `errornya, ${err}` });
        }
    }
    async nim(req, res) {
        res.send((await baseService_1.model.visitor.findOne({ where: { nim: req.params.u } })) || {});
    }
    async findAll(req, res) {
        res.send({ data: await baseService_1.model.visitor.count() });
    }
    async create(req, res) {
        const pattern = /[0-9]{2}.[0-9]{2}.[0-9]{4}/;
        if (!req.body.nim.match(pattern)) {
            req.flash("info", "failed");
            res.redirect("/");
        }
        const phase1 = await baseService_1.model.visitor.findOne({
            where: { nim: req.body.nim },
        });
        if (phase1) {
            req.flash("info", "exist");
            res.redirect("/");
        }
        else
            try {
                const de = (0, express_1.env)();
                const key = de["salt_bitter"] + req.body.nim;
                req.body.password = crypto_js_1.default.Rabbit.encrypt(req.body.password, key).toString();
                await baseService_1.model.visitor.create({
                    ...req.body,
                    status: "stage1",
                });
                req.flash("info", "success");
                res.redirect("/");
            }
            catch (error) {
                console.log(error);
                req.flash("info", "failed");
                res.redirect("/");
            }
    }
    async update(req, res) {
        try {
            const de = (0, express_1.env)();
            console.log(req.body);
            console.log(req.params.u);
            const key = de["salt_bitter"] + req.body.nim;
            req.body.password = crypto_js_1.default.Rabbit.encrypt(req.body.password, key).toString();
            await baseService_1.model.visitor.update(req.body, { where: { id_visitor: req.params.u } });
            req.flash("info", "edit");
            res.redirect("/");
        }
        catch (err) {
            req.flash("info", "failed");
            res.redirect("/");
        }
    }
    async delete(req, res) {
        await baseService_1.model.visitor.destroy({
            where: { id_visitor: req.params.u },
        });
        req.flash("info", "del");
        res.redirect("/dashboard");
    }
}
exports.default = new visitorService();
