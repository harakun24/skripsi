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
class jawabService extends baseService_1.default {
    index(req, res) {
        res.send("jawabService service");
    }
    find(req, res) {
        baseService_1.model.jawab
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
        if (!req.body.jawaban) {
            req.flash("info", "failed");
            res.redirect("/tanya");
        }
        else {
            const baru = {
                fk_tanya: req.body.fk_tanya,
                fk_divisi: req.body.fk_divisi,
                jawaban: req.body.jawaban,
                nilai: req.body.nilai,
            };
            baseService_1.model.jawab
                .create(baru)
                .then((data) => {
                req.flash("info", "add");
                res.redirect("/tanya");
            })
                .catch((err) => {
                console.log(err);
                req.flash("info", "failed");
                res.redirect("/tanya");
            });
        }
    }
    update(req, res) {
        baseService_1.model.jawab
            .update(req.body, {
            where: { id_jawab: req.params.u },
        })
            .then((data) => {
            req.flash("info", "edit");
            res.redirect("/tanya");
        })
            .catch((err) => {
            req.flash("info", "failed");
            console.log(err);
            res.redirect("/tanya");
        });
    }
    delete(req, res) {
        baseService_1.model.jawab
            .destroy({
            where: { id_jawab: req.params.u },
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
exports.default = new jawabService();
