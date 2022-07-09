import {Router, Response, Request} from "../Helper/express";
import baseRouter from "./baseRouter";
import service from "../Services/dashboardService";

export class dashboardRouter extends baseRouter {
    routing(rt:Router):void{
        this.router.get("/",service.index)
    }
}