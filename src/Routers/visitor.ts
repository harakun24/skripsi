import { Router, Response, Request } from "../Helper/express";
import baseRouter from "./baseRouter";
import service from "../Services/visitor";

export class visitorRouter extends baseRouter {
  routing(rt: Router): void {
    rt.post("/register", service.create);
    rt.post("/ubah/:u", service.update);
    rt.get("/id/:u", service.find);
    rt.get("/nim/:u", service.nim);
    rt.get("/count", service.findAll);
    rt.get("/hapus/:u", service.delete);
  }
}
