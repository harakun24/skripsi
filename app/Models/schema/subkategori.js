"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subkategori = void 0;
const baseModel_1 = __importDefault(require("./baseModel"));
class subkategori extends baseModel_1.default {
    constructor(type) {
        super();
        this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
        this.fk = {
            type: type.INTEGER,
            references: {
                model: "kategori",
                key: "id_kategori",
            },
        };
        this.name = { type: type.STRING };
    }
    create() {
        return this.define("subkategori", { id_sub: this.id, fk_kategori: this.fk, subkategori: this.name }, { freezeTableName: true });
    }
}
exports.subkategori = subkategori;
