import base from "./baseModel";

export class mdiv extends base {
  private id: Object;
  private sub: Object;
  private key: Object;
  private nilai: Object;
  constructor(type:any){    super();
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
    return this.define(
      "mdiv",
      {
        id_mdiv: this.id,
        d1: { ...this.key },
        d2: { ...this.key },
        sub: this.sub,
        nilai: this.nilai,
      },
      { freezeTableName: true }
    );
  }
}
