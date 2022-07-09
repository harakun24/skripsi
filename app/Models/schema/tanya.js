"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tanya = void 0;
const baseModel_1 = __importDefault(require("./baseModel"));
class tanya extends baseModel_1.default {
    constructor(type) {
        super();
        this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
        this.pertanyaan = { type: type.STRING };
    }
    create() {
        return this.define("tanya", { id_tanya: this.id, pertanyaan: this.pertanyaan }, { freezeTableName: true });
    }
}
exports.tanya = tanya;
