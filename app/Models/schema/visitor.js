"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitor = void 0;
const baseModel_1 = __importDefault(require("./baseModel"));
class visitor extends baseModel_1.default {
    constructor(type) {
        super();
        this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
        this.nim = { type: type.STRING };
        this.password = { type: type.STRING };
        this.nama = { type: type.STRING };
        this.status = { type: type.STRING };
        this.hasil = {
            type: type.INTEGER,
            allowNull: true,
            references: {
                model: "divisi",
                key: "id_divisi",
            },
        };
    }
    create() {
        return this.define("visitor", {
            id_visitor: this.id,
            nim: this.nim,
            password: this.password,
            nama: this.nama,
            status: this.status,
            hasil: this.hasil,
        }, { freezeTableName: true });
    }
}
exports.visitor = visitor;
