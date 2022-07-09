import { Request, Response, env } from "../Helper/express";
import base, { model } from "./baseService";
import crypto from "crypto-js";

class dashboardService extends base {
  async index(req: Request, res: Response) {
    // res.sendStatus(200);
    this.auth(req, res);

    const pengunjung = await model.visitor.findAll();
    const de = env();
    for (const p in pengunjung) {
      const pei = pengunjung[p].dataValues;
      const key = de["salt_bitter"] + pei.nim;
      pei.password = crypto.Rabbit.decrypt(pei.password, key).toString(
        crypto.enc.Utf8
      );
      pengunjung[p] = pei;
    }

    if(req.session.user?.type=="admin")
    res.render("admin", {
      title: "dashboard",
      info: req.flash("info"),
      divisi: await model.divisi.count(),
      kategori: await model.kategori.count(),
      subkategori: await model.subkategori.count(),
      visitor: await model.visitor.count(),
      kside: await model.kategori.findAll(),
      dside: await model.subkategori.findAll({ where: { fk_kategori: 3 } }),
      pengunjung,
      user: req.session.user,
      layout: "admin",
    });
    else if(req.session.user?.type=="user")
    res.render("visitor", {
      title: "dashboard",
      info: req.flash("info"),
      user: req.session.user,
      layout: "user",
    });
  }

  find(req: Request, res: Response) {
    res.sendStatus(200);
  }

  findAll(req: Request, res: Response) {
    res.sendStatus(200);
  }

  create(req: Request, res: Response) {
    res.sendStatus(200);
  }

  update(req: Request, res: Response) {
    res.sendStatus(200);
  }

  delete(req: Request, res: Response) {
    res.sendStatus(200);
  }
}
export default new dashboardService();
