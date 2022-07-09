import {Router, Response, Request} from "../Helper/express";
import baseRouter from "./baseRouter";
import service from "../Services/tanyaService";

export class tanyaRouter extends baseRouter {
    routing(rt:Router):void{
        rt.get("/", service.index);
        rt.get("/hapus/:u", service.delete);
        rt.get("/all", service.findAll);
        rt.get("/:u", service.find);
        rt.post("/tambah", service.create);
        rt.post("/ubah/:u", service.update);
    }
}