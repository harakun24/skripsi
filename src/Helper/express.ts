import express, { Application, Router, Request, Response } from "express";
import { config } from "dotenv";
import Color from "colors";
import { driver } from "../Models/modelCollector";
import session from "express-session";
import os from "os";

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}
config({ path: ".env" });

export class App {
  private app: Application;
  public static ex = express;

  constructor(
    callBack: Function = (port: number, opt: object[] = []) =>
      console.log(`run in port: ${port}`)
  ) {
    this.app = express();
    const iface = os.networkInterfaces();
    const ip = [];
    for (const i in iface) {
      for (const j of iface[i]!) {
        if (j.family != "IPv6") ip.push(j);
      }
    }
    console.log();
    const port = process.env.PORT ?? 5000;
    console.log("");
    // this.app.set("view cache", true);
    this.app.listen(port, callBack(port, ip));
    console.log("");
  }

  route(path: string, callback: Function) {
    const router = Router();

    callback(router);
    this.app.use(path, router);
  }
  static(virtual: string, path: string) {
    this.app.use(virtual, express.static(path));
  }
  setViews(path: string) {
    this.app.set("views", path);
  }
  engine(lang: string, opt1: string, opt2: any) {
    this.app.set("view engine", lang);
    if (opt1) {
      this.app.engine(opt1, opt2);
    }
  }
  use(...opt: any[]) {
    this.app.use(...opt);
  }
  sync(opt: Object = {}) {
    require("colors");

    driver.connect
      .sync(opt)
      .then(() => {
        console.log(
          "\nterhubung ke ".green + `db--${process.env["db_env"]}--`.cyan
        );
      })
      .catch((e: any) => {
        console.log(`terjadi masalah dengan database... `);
        const reset = () => {
          this.sync(opt);
        };
        setTimeout(reset, 1800);
      });
  }
}
const env = () => {
  config({ path: ".env" });
  return process.env;
};
export { Router, Request, Response, env };
