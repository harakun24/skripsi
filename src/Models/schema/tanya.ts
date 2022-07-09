import base from "./baseModel";

export class tanya extends base {
  private id: Object;
  private pertanyaan: Object;
  constructor(type:any){    super();
    this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
    this.pertanyaan = { type: type.STRING };
  }
  create() {
    return this.define(
      "tanya",
      { id_tanya: this.id, pertanyaan: this.pertanyaan },
      { freezeTableName: true }
    );
  }
}
