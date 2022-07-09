"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jawab = void 0;
const baseModel_1 = __importDefault(require("./baseModel"));
class jawab extends baseModel_1.default {
    constructor(type) {
        super();
        this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
        this.fk_tanya = {
            type: type.INTEGER,
            references: {
                model: "tanya",
                key: "id_tanya",
            },
        };
        this.fk_divisi = {
            type: type.INTEGER,
            references: {
                model: "divisi",
                key: "id_divisi",
            },
        };
        this.jawaban = { type: type.STRING };
        this.nilai = { type: type.INTEGER };
    }
    create() {
        return this.define("jawab", {
            id_jawab: this.id,
            fk_tanya: this.fk_tanya,
            fk_divisi: this.fk_divisi,
            jawaban: this.jawaban,
            nilai: this.nilai,
        }, { freezeTableName: true });
    }
}
exports.jawab = jawab;
