import { Request, Response } from "../Helper/express";
import modelCollector from "../Models/modelCollector";
require("colors");

abstract class baseService {
  [key: string]: any;
  
  static model = new modelCollector().Tables("all");
  protected env: any;
  constructor() {
    console.log(`[service]`.yellow+` ${this.constructor.name}   `+`\t | `.yellow+`invoked! `.green+"|".yellow);
    const listMethod = Object.getOwnPropertyNames(this.constructor.prototype);
    for (const list of listMethod) {
      this[list] = this[list].bind(this);
    }
  }
  public base(req: Request) {
    return req.protocol + "://" + req.get("host");
  }
  auth(req: Request, res: Response) {
    // if (typeof req.session.user == "undefined") return res.redirect("/");
  }
  abstract index(req: Request, res: Response):void;
  abstract find(req: Request, res: Response):void;
  abstract findAll(req: Request, res: Response):void;
  abstract create(req: Request, res: Response):void;
  abstract update(req: Request, res: Response):void;
  abstract delete(req: Request, res: Response):void;
}

export default baseService;
const { model } = baseService;
export { model };
