import base from "./baseModel";

export class divisi extends base {
  private id: Object;
  private name: Object;
  constructor(type: any) {
    super();
    this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
    this.name = { type: type.STRING };
  }
  create() {
    return this.define(
      "divisi",
      { id_divisi: this.id, divisi: this.name },
      { freezeTableName: true }
    );
  }
}
