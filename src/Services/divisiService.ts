import { Request, Response } from "../Helper/express";
import base, { model } from "./baseService";

class divisiService extends base {
  async index(req: Request, res: Response){
    this.auth(req, res);

    res.render("divisi", {
      title: "divisi",
      divisi: await model.divisi.findAll(),
      user: req.session.user,
      layout: "admin",
      kside: await model.kategori.findAll(),
      dside: await model.subkategori.findAll({ where: { fk_kategori: 3 } }),
      info: req.flash("info"),
    });
  }

  async find(req: Request, res: Response){
    try {
      res.send((await model.divisi.findByPk(req.params.u)) || {});
    } catch (err) {
      console.log(err);
      res.status(500).send({ ps: `errornya, ${err}` });
    }
    
  }

  async findAll(req: Request, res: Response){
    try {
      const data = await model.divisi.findAll();
      res.send(data || {});
    } catch (err) {
      console.log(err);
      res.status(500).send({ ps: `errornya, ${err}` });
    }
    
  }

  async create(req: Request, res: Response){
    if (!req.body.divisi) {
      req.flash("info", "failed");
      res.redirect("/divisi");
    } else {
      const baru = {
        divisi: req.body.divisi,
      };

      try {
        await model.divisi.create(baru);
        req.flash("info", "add");
        res.redirect("/divisi");
      } catch (err) {
        console.log(err);
        req.flash("info", "failed");
        res.redirect("/divisi");
      }
    }
    
  }

  async update(req: Request, res: Response){
    try {
      await model.divisi.update(req.body, {
        where: { id_divisi: req.params.u },
      });
      req.flash("info", "edit");
      res.redirect("/divisi");
    } catch (err) {
      console.log(err);
      req.flash("info", "failed");
      res.redirect("/divisi");
    }
    
  }

  async delete(req: Request, res: Response){
    try {
      await model.divisi.destroy({ where: { id_divisi: req.params.u } });
      req.flash("info", "del");
      res.redirect("/divisi");
    } catch (err) {
      console.log(err);
      req.flash("info", "failed");
      res.redirect("/divisi");
    }
    
  }
}
export default new divisiService();
