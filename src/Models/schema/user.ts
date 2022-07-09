import base from "./baseModel";

export class user extends base {
  private id: Object;
  private username: Object;
  private password: Object;
  constructor(type: any) {
    super();
    this.id = { type: type.INTEGER, primaryKey: true, autoIncrement: true };
    this.username = { type: type.STRING };
    this.password = { type: type.STRING };
  }
  create() {
    const data = this.define(
      "user",
      {
        id_user: this.id,
        username: this.username,
        password: this.password,
      },
      { freezeTableName: true }
    );
    return data;
  }
}
