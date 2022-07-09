import db from "../config/connect";
require("colors");
abstract class baseModel {
  static connect = db.connect;

  define(name: string, data: Object, option: Object = {}): any {
    const res = baseModel.connect.define(name, data, option);
    console.log(`[model]`.green + ` ${name}   ` + ` \t\t |`.cyan+` generated `.green+"|".cyan);
    return res;
  }
  abstract create(): any;
}

export default baseModel;
