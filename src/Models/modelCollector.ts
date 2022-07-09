import db from "./config/connect";
import baseModel from "./schema/baseModel";
import relational from "./config/relational";
import { user } from "./schema/user";
import { kategori } from "./schema/kategori";
import { divisi } from "./schema/divisi";
import { subkategori } from "./schema/subkategori";
import { visitor } from "./schema/visitor";
import { tanya } from "./schema/tanya";
import { jawab } from "./schema/jawab";
import { mdiv } from "./schema/mdiv";
import { mkategori } from "./schema/mkategori";
import { msub } from "./schema/msub";
//autoimport
require("colors");

class modelCollector {
  private Table: any;
  static driver = db;

  constructor() {
    const { type } = modelCollector.driver;

    console.log("Table models:".green);
    console.log("---------------------------------------------".cyan);
    db["user"] = new user(type).create();
    db["kategori"] = new kategori(type).create();
    db["divisi"] = new divisi(type).create();
    db["subkategori"] = new subkategori(type).create();
    db["visitor"] = new visitor(type).create();
    db["tanya"] = new tanya(type).create();
    db["jawab"] = new jawab(type).create();
    db["mdiv"] = new mdiv(type).create();
    db["mkategori"] = new mkategori(type).create();
    db["msub"] = new msub(type).create();
    //autopush
    console.log("---------------------------------------------".cyan);
    this.Table = db;
    console.log("");
    this.Table = relational(this.Table);
  }

  Tables(name = "all") {
    return name == "all" ? this.Table : this.Table[name];
  }
}

export default modelCollector;
console.log("");
const driver = modelCollector.driver;
export { driver };
