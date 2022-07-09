import base from "./baseModel";

export class subkategori extends base {
  private id: Object;
  private fk: Object;
  private name: Object;
  constructor(type:any){    super();
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
    return this.define(
      "subkategori",
      { id_sub: this.id, fk_kategori: this.fk, subkategori: this.name },
      { freezeTableName: true }
    );
  }
}
