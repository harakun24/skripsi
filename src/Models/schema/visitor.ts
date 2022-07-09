import base from "./baseModel";

export class visitor extends base {
  private id: Object;
  private nim: Object;
  private password: Object;
  private nama: Object;
  private status: Object;
  private hasil: Object;
  constructor(type:any){    super();
    this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
    this.nim = { type: type.STRING };
    this.password = { type: type.STRING };
    this.nama = { type: type.STRING };
    this.status = { type: type.STRING };
    this.hasil = {
      type: type.INTEGER,
      allowNull: true,
      references: {
        model: "divisi",
        key: "id_divisi",
      },
    };
  }
  create() {
    return this.define(
      "visitor",
      {
        id_visitor: this.id,
        nim: this.nim,
        password: this.password,
        nama: this.nama,
        status: this.status,
        hasil: this.hasil,
      },
      { freezeTableName: true }
    );
  }
}
