import { Router } from "../Helper/express";
import baseRouter from "./baseRouter";
import { model } from "../Services/baseService";
require("colors");

import { userRouter } from "./userRouter";
import { kategoriRouter } from "./kategoriRouter";
import { divisiRouter } from "./divisiRouter";
import { subkatRouter } from "./subkatRouter";
import { tanyaRouter } from "./tanyaRouter";
import { jawabRouter } from "./jawabRouter";
import { mkategoriRouter } from "./mkategoriRouter";
import { msubRouter } from "./msubRouter";
import { dashboardRouter } from "./dashboardRouter";
import { visitorRouter } from "./visitor";
import { mdivRouter } from "./mdivRouter";
import { defaultRouter } from "./defaultRouter";
//autoimport
console.log("--------------------------------------------".yellow);


export default class routerCollector {
  private list: { to: string; from: baseRouter }[];
  private router: Router;

  constructor() {
    this.list = [];
    this.router = Router();

    //collect all routers
    // this.list.push({to:"/", from:new userRouter()})
    console.log("\nTable routers:".cyan);
    console.log("------------------------------------------".green);
    this.list.push({ to: "/pengurus", from: new userRouter() });
    this.list.push({ to: "/kategori", from: new kategoriRouter() });
    this.list.push({ to: "/divisi", from: new divisiRouter() });
    this.list.push({ to: "/subkategori", from: new subkatRouter() });
    this.list.push({ to: "/tanya", from: new tanyaRouter() });
    this.list.push({ to: "/jawab", from: new jawabRouter() });
    this.list.push({ to: "/m/kategori", from: new mkategoriRouter() });
    this.list.push({ to: "/m/sub", from: new msubRouter() });
    this.list.push({ to: "/m/divisi", from: new mdivRouter() });
    this.list.push({ to: "/", from: new defaultRouter() });
    this.list.push({ to: "/dashboard", from: new dashboardRouter() });
    this.list.push({ to: "/visitor", from: new visitorRouter() });
    //autopush
    console.log("------------------------------------------".green);
  }

  getList(): Router {
    for (const handler of this.list) {
      this.router.use(handler.to, handler.from.router);
    }
    return this.router;
  }
}
const router = new routerCollector().getList();
export {router}
