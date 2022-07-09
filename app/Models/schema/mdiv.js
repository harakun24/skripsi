"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mdiv = void 0;
const baseModel_1 = __importDefault(require("./baseModel"));
class mdiv extends baseModel_1.default {
    constructor(type) {
        super();
        this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
        this.key = {
            type: type.INTEGER,
            references: {
                model: "divisi",
                key: "id_divisi",
            },
        };
        (this.sub = {
            type: type.INTEGER,
            references: {
                model: "subkategori",
                key: "id_sub",
            },
        }),
            (this.nilai = { type: type.FLOAT });
    }
    create() {
        return this.define("mdiv", {
            id_mdiv: this.id,
            d1: { ...this.key },
            d2: { ...this.key },
            sub: this.sub,
            nilai: this.nilai,
        }, { freezeTableName: true });
    }
}
exports.mdiv = mdiv;
