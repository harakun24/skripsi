import { Router, Response, Request } from "../Helper/express";
import baseRouter from "./baseRouter";
import service from "../Services/mdivService";

export class mdivRouter extends baseRouter {
  routing(rt: Router): void {
    rt.get("/:num?", service.index);
    rt.get("/ubah/:m/:u/:n", service.update);
    rt.get("/reset/:u", service.reset);
  }
}
