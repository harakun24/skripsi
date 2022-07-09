import { App, Router, Response, Request } from "./Helper/express";
import routerCollector from "./Routers/routerCollector";
import { router as collect } from "./Routers/routerCollector";
import morgan from "morgan";
import helmet from "helmet";
import session from "express-session";
import flash from "express-flash";
import hbs from "express-handlebars";
import cookie from "cookie-parser";

const app = new App((port: number, opt: any[]) => {
  console.log("server berjalan");
  require("colors");

  console.log(`silahkan akses `.magenta + ` http://localhost:${port}/`.cyan);
  for (const o of opt) {
    console.log(
      `silahkan akses `.magenta + ` http://${o.address}:${port}/`.cyan
    );
  }
});
// const app = new App();

app.sync();

app.use(App.ex.json());
app.use(App.ex.urlencoded({ extended: true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cookie());
app.use(
  session({ secret: "something", resave: false, saveUninitialized: true })
);
app.use(flash());

app.static("/assets", "public");
app.engine(
  "hbs",
  ".hbs",
  hbs({
    extname: ".hbs",
    defaultLayout: false,
    partialsDir: "./Views/components",
    layoutsDir: "./Views/template",
  })
);
app.setViews("./Views");
app.use(morgan("dev"));

app.route("/", (router: Router) => {
  // router.use("/", new routerCollector().getList());
  // router.use(function (req, res, next) {
  //   req.session.user = { type: "user" };
  //   next();
  // });
  router.use("/", collect);
  // router.use("/iroot", new routerCollector().getList());
  router.get("/logout", (req: Request, res: Response) => {
    delete req.session.user;
    res.redirect("/");
  });
  router.use((req: Request, res: Response) => {
    res.render("404");
  });
});

//console.log
