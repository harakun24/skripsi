import { Router, Response, Request } from "../Helper/express";
import baseRouter from "./baseRouter";
import service from "../Services/mkategoriService";

export class mkategoriRouter extends baseRouter {
  routing(rt: Router): void {
    rt.get("/", service.index);
    rt.get("/ubah/:u/:n", service.update);
    rt.get("/reset", service.reset);
  }
}
