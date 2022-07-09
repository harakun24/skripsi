import base from "./baseModel";

export class jawab extends base {
  private id: Object;
  private fk_tanya: Object;
  private fk_divisi: Object;
  private jawaban: Object;
  private nilai: Object;
  constructor(type:any){    super();
    this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
    this.fk_tanya = {
      type: type.INTEGER,
      references: {
        model: "tanya",
        key: "id_tanya",
      },
    };
    this.fk_divisi = {
      type: type.INTEGER,
      references: {
        model: "divisi",
        key: "id_divisi",
      },
    };
    this.jawaban = { type: type.STRING };
    this.nilai = { type: type.INTEGER };
  }
  create() {
    return this.define(
      "jawab",
      {
        id_jawab: this.id,
        fk_tanya: this.fk_tanya,
        fk_divisi: this.fk_divisi,
        jawaban: this.jawaban,
        nilai: this.nilai,
      },
      { freezeTableName: true }
    );
  }
}
