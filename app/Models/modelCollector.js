"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.driver = void 0;
const connect_1 = __importDefault(require("./config/connect"));
const relational_1 = __importDefault(require("./config/relational"));
const user_1 = require("./schema/user");
const kategori_1 = require("./schema/kategori");
const divisi_1 = require("./schema/divisi");
const subkategori_1 = require("./schema/subkategori");
const visitor_1 = require("./schema/visitor");
const tanya_1 = require("./schema/tanya");
const jawab_1 = require("./schema/jawab");
const mdiv_1 = require("./schema/mdiv");
const mkategori_1 = require("./schema/mkategori");
const msub_1 = require("./schema/msub");
require("colors");
class modelCollector {
    constructor() {
        const { type } = modelCollector.driver;
        console.log("Table models:".green);
        console.log("---------------------------------------------".cyan);
        connect_1.default["user"] = new user_1.user(type).create();
        connect_1.default["kategori"] = new kategori_1.kategori(type).create();
        connect_1.default["divisi"] = new divisi_1.divisi(type).create();
        connect_1.default["subkategori"] = new subkategori_1.subkategori(type).create();
        connect_1.default["visitor"] = new visitor_1.visitor(type).create();
        connect_1.default["tanya"] = new tanya_1.tanya(type).create();
        connect_1.default["jawab"] = new jawab_1.jawab(type).create();
        connect_1.default["mdiv"] = new mdiv_1.mdiv(type).create();
        connect_1.default["mkategori"] = new mkategori_1.mkategori(type).create();
        connect_1.default["msub"] = new msub_1.msub(type).create();
        console.log("---------------------------------------------".cyan);
        this.Table = connect_1.default;
        console.log("");
        this.Table = (0, relational_1.default)(this.Table);
    }
    Tables(name = "all") {
        return name == "all" ? this.Table : this.Table[name];
    }
}
modelCollector.driver = connect_1.default;
exports.default = modelCollector;
console.log("");
const driver = modelCollector.driver;
exports.driver = driver;
