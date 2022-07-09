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
class tanyaService extends baseService_1.default {
    async index(req, res) {
        this.auth(req, res);
        res.render("tanya", {
            title: "pertanyaan",
            tanya: await baseService_1.model.tanya.findAll({
                include: [
                    {
                        model: baseService_1.model.jawab,
                        include: [baseService_1.model.divisi],
                    },
                ],
            }),
            kside: await baseService_1.model.kategori.findAll(),
            dside: await baseService_1.model.subkategori.findAll({ where: { fk_kategori: 3 } }),
            user: req.session.user,
            layout: "admin",
            info: req.flash("info"),
        });
    }
    find(req, res) {
        baseService_1.model.tanya
            .findByPk(req.params.u)
            .then((data) => res.send(data || {}))
            .catch((err) => res.status(500).send({ ps: `errornya, ${err}` }));
    }
    findAll(req, res) {
        baseService_1.model.kategori
            .findAll()
            .then((data) => res.send(data || {}))
            .catch((err) => res.status(500).send({ ps: `errornya, ${err}` }));
    }
    create(req, res) {
        if (!req.body.pertanyaan) {
            req.flash("info", "failed");
            res.redirect("/tanya");
        }
        else {
            const baru = {
                pertanyaan: req.body.pertanyaan,
            };
            baseService_1.model.tanya
                .create(baru)
                .then((data) => {
                req.flash("info", "add");
                res.redirect("/tanya");
            })
                .catch((err) => {
                req.flash("info", "failed");
                res.redirect("/tanya");
            });
        }
    }
    update(req, res) {
        baseService_1.model.tanya
            .update(req.body, {
            where: { id_tanya: req.params.u },
        })
            .then((data) => {
            req.flash("info", "edit");
            res.redirect("/tanya");
        })
            .catch((err) => {
            req.flash("info", "failed");
            res.redirect("/tanya");
        });
    }
    delete(req, res) {
        baseService_1.model.tanya
            .destroy({
            where: { id_tanya: req.params.u },
        })
            .then((data) => {
            req.flash("info", "del");
            res.redirect("/tanya");
        })
            .catch((err) => {
            req.flash("info", "failed");
            res.redirect("/tanya");
        });
    }
}
exports.default = new tanyaService();
