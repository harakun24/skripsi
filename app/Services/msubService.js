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
const matrix_1 = __importStar(require("./matrix"));
class msubService extends matrix_1.default {
    async index(req, res) {
        this.auth(req, res);
        if (!req.params.num) {
            return res.redirect("/");
        }
        let sub = await matrix_1.model.subkategori.findAll({
            where: {
                fk_kategori: req.params.num,
            },
        });
        if ((await matrix_1.model.subkategori.count({
            where: {
                fk_kategori: req.params.num,
            },
        })) < 3) {
            req.flash("info", "kat");
            res.redirect("/subkategori");
        }
        else {
            const count = await matrix_1.model.msub.count({
                where: {
                    sub1: sub[0].dataValues.id_sub,
                },
            });
            sub = sub.map((item, index) => {
                return {
                    id: item.id_sub,
                    sub: item.subkategori,
                };
            });
            if (count < 1) {
                for (let i = 0; i < sub.length - 1; i++) {
                    for (let j = i + 1; j < sub.length; j++) {
                        const pair = {
                            sub1: sub[i].id,
                            sub2: sub[j].id,
                            nilai: j + 1,
                        };
                        await matrix_1.model.msub.create(pair);
                    }
                }
            }
            const msub = await matrix_1.model.msub.findAll({
                include: [
                    {
                        model: matrix_1.model.subkategori,
                        as: "key1",
                        where: {
                            fk_kategori: req.params.num,
                        },
                    },
                    {
                        model: matrix_1.model.subkategori,
                        as: "key2",
                        where: {
                            fk_kategori: req.params.num,
                        },
                    },
                ],
            });
            const { result } = await this.matrix(sub, msub, "sub");
            const bread = await matrix_1.model.kategori.findByPk(req.params.num);
            res.render("msub", {
                title: "matriks subkriteria",
                result,
                bread: bread.dataValues,
                mkat: msub,
                kat: sub,
                id_kat: req.params.num,
                kside: await matrix_1.model.kategori.findAll(),
                dside: await matrix_1.model.subkategori.findAll({ where: { fk_kategori: 3 } }),
                info: req.flash("info"),
                user: req.session.user,
                layout: "admin",
            });
        }
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
    async update(req, res) {
        try {
            await matrix_1.model.msub.update({ nilai: req.params.n }, {
                where: { id_msub: req.params.u },
            });
            req.flash("info", "edit");
            res.redirect(`/m/sub/${req.params.m}`);
        }
        catch (err) {
            req.flash("info", "failed");
            res.redirect(`/m/sub/${req.params.m}`);
        }
    }
    delete(req, res) {
        res.sendStatus(200);
    }
    async reset(req, res) {
        const sub = await matrix_1.model.subkategori.findAll({ where: { fk_kategori: req.params.u } });
        for (const val of sub) {
            const id_val = val.dataValues.id_sub;
            await matrix_1.model.msub.destroy({ where: { sub1: id_val } });
            await matrix_1.model.msub.destroy({ where: { sub2: id_val } });
        }
        console.log(`msub ${req.params.u}  reset`);
        res.redirect("/m/sub/" + req.params.u);
    }
}
exports.default = new msubService();
