"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kategori = void 0;
const baseModel_1 = __importDefault(require("./baseModel"));
class kategori extends baseModel_1.default {
    constructor(type) {
        super();
        this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
        this.name = { type: type.STRING };
    }
    create() {
        return this.define("kategori", { id_kategori: this.id, kategori: this.name }, { freezeTableName: true });
    }
}
exports.kategori = kategori;
