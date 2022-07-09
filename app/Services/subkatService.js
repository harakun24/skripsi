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
class subkatService extends baseService_1.default {
    async index(req, res) {
        this.auth(req, res);
        res.render("subkategori", {
            title: "sub kategori",
            kside: await baseService_1.model.kategori.findAll(),
            dside: await baseService_1.model.subkategori.findAll({ where: { fk_kategori: 3 } }),
            subkategori: await baseService_1.model.subkategori.findAll({
                include: [
                    {
                        model: baseService_1.model.kategori,
                    },
                ],
            }),
            user: req.session.user,
            layout: "admin",
            info: req.flash("info"),
        });
    }
    find(req, res) {
        baseService_1.model.subkategori
            .findByPk(req.params.u)
            .then((data) => res.send(data || {}))
            .catch((err) => res.status(500).send({ ps: `errornya, ${err}` }));
    }
    findAll(req, res) {
        res.sendStatus(200);
    }
    create(req, res) {
        if (!req.body.subkategori) {
            req.flash("info", "failed");
            res.redirect("/subkategori");
        }
        else {
            const baru = {
                subkategori: req.body.subkategori,
                fk_kategori: req.body.kategori,
            };
            baseService_1.model.subkategori
                .create(baru)
                .then((data) => {
                req.flash("info", "add");
                res.redirect("/subkategori");
            })
                .catch((err) => {
                req.flash("info", "failed");
                res.redirect("/subkategori");
            });
        }
    }
    update(req, res) {
        baseService_1.model.subkategori
            .update(req.body, {
            where: { id_sub: req.params.u },
        })
            .then((data) => {
            req.flash("info", "edit");
            res.redirect("/subkategori");
        })
            .catch((err) => {
            req.flash("info", "failed");
            res.redirect("/subkategori");
        });
    }
    async delete(req, res) {
        await baseService_1.model.msub.destroy({ where: { sub1: req.params.u } });
        await baseService_1.model.msub.destroy({ where: { sub2: req.params.u } });
        baseService_1.model.subkategori
            .destroy({
            where: { id_sub: req.params.u },
        })
            .then((data) => {
            req.flash("info", "del");
            res.redirect("/subkategori");
        })
            .catch((err) => {
            console.log(err);
            req.flash("info", "failed");
            res.redirect("/subkategori");
        });
    }
}
exports.default = new subkatService();
