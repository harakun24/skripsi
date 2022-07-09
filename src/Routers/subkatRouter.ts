import {Router, Response, Request} from "../Helper/express";
import baseRouter from "./baseRouter";
import service from "../Services/subkatService";

export class subkatRouter extends baseRouter {
    routing(rt:Router):void{
        rt.get("/", service.index);
        rt.get("/hapus/:u", service.delete);
        rt.get("/:u", service.find);
        rt.post("/tambah", service.create);
        rt.post("/ubah/:u", service.update);
    }
}