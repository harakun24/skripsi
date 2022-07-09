import { Router, Response, Request } from "../Helper/express";
import baseRouter from "./baseRouter";
//import service from "../Services/yourService";

export class defaultRouter extends baseRouter {
  routing(rt: Router): void {
    this.router.get("/", (req: Request, res: Response) => {
      if (req.session.user) {
        req.flash("info", `${req.flash("info")}`);
        res.redirect("/dashboard");
      } else
        res.render("main", {
          layout: "main",
          title: "web info",
          info: req.flash("info"),
        });
    });
  }
}
