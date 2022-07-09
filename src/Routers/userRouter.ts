import { Router, Response, Request } from "../Helper/express";
import baseRouter from "./baseRouter";
import service from "../Services/userService";

export class userRouter extends baseRouter {
  routing(rt: Router): void {
    rt.get("/", service.index);
    rt.get("/id/:u", service.find);
    rt.post("/auth", service.proses);
    rt.post("/tambah", service.create);
    rt.post("/ubah/:u", service.update);
    rt.get("/hapus/:u", service.delete);
  }
}
