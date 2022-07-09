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
class mkategoriService extends matrix_1.default {
    async index(req, res) {
        this.auth(req, res);
        const count0 = await matrix_1.model.kategori.count();
        let count = await matrix_1.model.mkategori.count();
        if (!this.reform(count0, count)) {
            count = 0;
            await matrix_1.model.mkategori.destroy({ where: {}, truncate: true });
        }
        let kat = await matrix_1.model.kategori.findAll();
        kat = kat.map((item, index) => {
            return {
                id: item.id_kategori,
                kategori: item.kategori,
            };
        });
        if (count < 1) {
            for (let i = 0; i < kat.length - 1; i++) {
                for (let j = i + 1; j < kat.length; j++) {
                    const pair = {
                        k1: kat[i].id,
                        k2: kat[j].id,
                        nilai: j + 1,
                    };
                    await matrix_1.model.mkategori.create(pair);
                }
            }
        }
        const mkat = await matrix_1.model.mkategori.findAll({
            include: [
                { model: matrix_1.model.kategori, as: "key1" },
                { model: matrix_1.model.kategori, as: "key2" },
            ],
        });
        const hasil = await this.matrix(kat, mkat, "kat");
        res.render("mkategori", {
            title: "matriks kategori",
            result: hasil.result,
            mkat,
            kside: await matrix_1.model.kategori.findAll(),
            dside: await matrix_1.model.subkategori.findAll({ where: { fk_kategori: 3 } }),
            kat: hasil.mat,
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
            await matrix_1.model.mkategori.update({ nilai: req.params.n }, {
                where: { id_mkategori: req.params.u },
            });
            req.flash("info", "edit");
            res.redirect("/m/kategori");
        }
        catch (err) {
            req.flash("info", "failed");
            res.redirect("/m/kategori");
        }
    }
    delete(req, res) {
        res.sendStatus(200);
    }
    async reset(req, res) {
        await matrix_1.model.mkategori.destroy({ where: {}, truncate: true });
        res.redirect("/m/kategori");
    }
}
exports.default = new mkategoriService();
