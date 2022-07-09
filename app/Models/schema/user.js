"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const baseModel_1 = __importDefault(require("./baseModel"));
class user extends baseModel_1.default {
    constructor(type) {
        super();
        this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
        this.username = { type: type.STRING };
        this.password = { type: type.STRING };
    }
    create() {
        const data = this.define("user", {
            id_user: this.id,
            username: this.username,
            password: this.password,
        }, { freezeTableName: true });
        return data;
    }
}
exports.user = user;
