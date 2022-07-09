import base from "./baseModel";

export class msub extends base {
  private id: Object;
  private key: Object;
  private nilai: Object;
  constructor(type:any){    super();
    this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
    this.key = {
      type: type.INTEGER,
      references: {
        model: "subkategori",
        key: "id_sub",
      },
    };

    this.nilai = { type: type.FLOAT };
  }
  create() {
    return this.define(
      "msub",
      {
        id_msub: this.id,
        sub1: { ...this.key },
        sub2: { ...this.key },
        nilai: this.nilai,
      },
      { freezeTableName: true }
    );
  }
}
