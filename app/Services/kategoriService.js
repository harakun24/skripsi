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
Object.defineProperty(exports, "__esModule", { value: true });
const baseService_1 = __importStar(require("./baseService"));
class kategoriService extends baseService_1.default {
    async index(req, res) {
        this.auth(req, res);
        res.render("kategori", {
            title: "kategori",
            kside: await baseService_1.model.kategori.findAll(),
            dside: await baseService_1.model.subkategori.findAll({ where: { fk_kategori: 3 } }),
            kategori: await baseService_1.model.kategori.findAll(),
            user: req.session.user,
            layout: "admin",
            info: req.flash("info"),
        });
    }
    async find(req, res) {
        try {
            res.send((await baseService_1.model.kategori.findByPk(req.params.u)) || {});
        }
        catch (err) {
            res.status(500).send({ ps: `errornya, ${err}` });
        }
    }
    async findAll(req, res) {
        try {
            res.send((await baseService_1.model.kategori.findAll()) || {});
        }
        catch (err) {
            res.status(500).send({ ps: `errornya, ${err}` });
        }
    }
    async create(req, res) {
        if (!req.body.kategori) {
            req.flash("info", "failed");
            res.redirect("/kategori");
        }
        else {
            const baru = {
                kategori: req.body.kategori,
            };
            try {
                await baseService_1.model.kategori.create(baru);
                req.flash("info", "add");
                res.redirect("/kategori");
            }
            catch (err) {
                console.log(err);
                req.flash("info", "failed");
                res.redirect("/kategori");
            }
        }
    }
    async update(req, res) {
        try {
            await baseService_1.model.kategori.update(req.body, {
                where: { id_kategori: req.params.u },
            });
            req.flash("info", "edit");
            res.redirect("/kategori");
        }
        catch (err) {
            console.log(err);
            req.flash("info", "failed");
            res.redirect("/kategori");
        }
    }
    async delete(req, res) {
        try {
            await baseService_1.model.kategori.destroy({ where: { id_kategori: req.params.u } });
            req.flash("info", "del");
            res.redirect("/kategori");
        }
        catch (err) {
            console.log(err);
            req.flash("info", "failed");
            res.redirect("/kategori");
        }
    }
}
exports.default = new kategoriService();
