import base from "./baseModel";

export class mkategori extends base {
  private id: Object;
  private key: Object;
  private nilai: Object;
  constructor(type:any){    super();
    this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
    this.key = {
      type: type.INTEGER,
      references: {
        model: "kategori",
        key: "id_kategori",
      },
    };

    this.nilai = { type: type.FLOAT };
  }
  create() {
    return this.define(
      "mkategori",
      {
        id_mkategori: this.id,
        k1: { ...this.key },
        k2: { ...this.key },
        nilai: this.nilai,
      },
      { freezeTableName: true }
    );
  }
}
