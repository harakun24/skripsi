import { Router, Response, Request } from "../Helper/express";
import baseRouter from "./baseRouter";
import service from "../Services/kategoriService";

export class kategoriRouter extends baseRouter {
  routing(rt: Router): void {
    rt.get("/", service.index);
    rt.get("/all", service.findAll);
    rt.get("/:u", service.find);
    rt.post("/tambah", service.create);
    rt.post("/ubah/:u", service.update);
    rt.get("/hapus/:u", service.delete);
  }
}
