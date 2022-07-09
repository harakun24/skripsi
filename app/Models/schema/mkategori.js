"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkategori = void 0;
const baseModel_1 = __importDefault(require("./baseModel"));
class mkategori extends baseModel_1.default {
    constructor(type) {
        super();
        this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
        this.key = {
            type: type.INTEGER,
            references: {
                model: "kategori",
                key: "id_kategori",
            },
        };
        this.nilai = { type: type.FLOAT };
    }
    create() {
        return this.define("mkategori", {
            id_mkategori: this.id,
            k1: { ...this.key },
            k2: { ...this.key },
            nilai: this.nilai,
        }, { freezeTableName: true });
    }
}
exports.mkategori = mkategori;
