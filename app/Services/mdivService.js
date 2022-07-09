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
class mdivService extends matrix_1.default {
    async index(req, res) {
        this.auth(req, res);
        let count0 = await matrix_1.model.divisi.count();
        if (count0 < 3) {
            req.flash("info", "div");
            res.redirect("/divisi");
        }
        if (!req.params.num) {
            return res.redirect("/");
        }
        let div = await matrix_1.model.divisi.findAll();
        let count = await matrix_1.model.mdiv.count({
            where: {
                sub: req.params.num,
            },
        });
        if (!this.reform(count0, count)) {
            count = 0;
            await matrix_1.model.mkategori.destroy({
                where: {
                    sub: req.params.num,
                },
                truncate: true,
            });
        }
        div = div.map((item, index) => {
            return {
                id: item.id_divisi,
                divisi: item.divisi,
            };
        });
        if (count < 1) {
            for (let i = 0; i < div.length - 1; i++) {
                for (let j = i + 1; j < div.length; j++) {
                    const pair = {
                        d1: div[i].id,
                        d2: div[j].id,
                        sub: req.params.num,
                        nilai: j + 1,
                    };
                    await matrix_1.model.mdiv.create(pair);
                }
            }
        }
        const mdiv = await matrix_1.model.mdiv.findAll({
            where: {
                sub: req.params.num,
            },
            include: [
                {
                    model: matrix_1.model.divisi,
                    as: "key1",
                },
                {
                    model: matrix_1.model.divisi,
                    as: "key2",
                },
                {
                    model: matrix_1.model.subkategori,
                    as: "subs",
                },
            ],
        });
        const { result } = await this.matrix(div, mdiv, "div");
        const bread = await matrix_1.model.subkategori.findByPk(req.params.num);
        res.render("mdiv", {
            title: "matriks divisi",
            result,
            bread: bread.dataValues,
            mkat: mdiv,
            kat: div,
            id_reset: req.params.num,
            kside: await matrix_1.model.kategori.findAll(),
            dside: await matrix_1.model.subkategori.findAll({ where: { fk_kategori: 3 } }),
            info: req.flash("info"),
            user: req.session.user,
            layout: "admin",
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
    async update(req, res) {
        try {
            await matrix_1.model.mdiv.update({ nilai: req.params.n }, {
                where: { id_mdiv: req.params.u },
            });
            req.flash("info", "edit");
            res.redirect(`/m/divisi/${req.params.m}`);
        }
        catch (err) {
            req.flash("info", "failed");
            res.redirect(`/m/divisi/${req.params.m}`);
        }
    }
    delete(req, res) {
        res.sendStatus(200);
    }
    async reset(req, res) {
        await matrix_1.model.mdiv.destroy({ where: { sub: req.params.u } });
        console.log(`mdiv sub: ${req.params.u}  reset`);
        res.redirect("/m/divisi/" + req.params.u);
    }
}
exports.default = new mdivService();
