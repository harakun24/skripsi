import base from "./baseModel";

export class kategori extends base {
  private id: Object;
  private name: Object;
  constructor(type:any){    super();
    this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
    this.name = { type: type.STRING };
  }
  create() {
    return this.define(
      "kategori",
      { id_kategori: this.id, kategori: this.name },
      { freezeTableName: true }
    );
  }
}
