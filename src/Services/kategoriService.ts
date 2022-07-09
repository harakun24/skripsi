import { Request, Response } from "../Helper/express";
import base, { model } from "./baseService";

class kategoriService extends base {
  async index(req: Request, res: Response){
    this.auth(req, res);

    res.render("kategori", {
      title: "kategori",
      kside: await model.kategori.findAll(),
      dside: await model.subkategori.findAll({ where: { fk_kategori: 3 } }),
      kategori: await model.kategori.findAll(),
      user: req.session.user,
      layout: "admin",
      info: req.flash("info"),
    });
        
  }

  async find(req: Request, res: Response){
    try {
      res.send((await model.kategori.findByPk(req.params.u)) || {});
    } catch (err) {
      res.status(500).send({ ps: `errornya, ${err}` });
    }
        
  }

  async findAll(req: Request, res: Response){
    try {
      res.send((await model.kategori.findAll()) || {});
    } catch (err) {
      res.status(500).send({ ps: `errornya, ${err}` });
    }
        
  }

  async create(req: Request, res: Response){
    if (!req.body.kategori) {
      req.flash("info", "failed");
      res.redirect("/kategori");
    } else {
      const baru = {
        kategori: req.body.kategori,
      };

      try {
        await model.kategori.create(baru);
        req.flash("info", "add");
        res.redirect("/kategori");
      } catch (err) {
        console.log(err);
        req.flash("info", "failed");
        res.redirect("/kategori");
      }
    }
        
  }

  async update(req: Request, res: Response){
    try {
      await model.kategori.update(req.body, {
        where: { id_kategori: req.params.u },
      });
      req.flash("info", "edit");
      res.redirect("/kategori");
    } catch (err) {
      console.log(err);
      req.flash("info", "failed");
      res.redirect("/kategori");
    }
        
  }

  async delete(req: Request, res: Response){
    try {
      await model.kategori.destroy({ where: { id_kategori: req.params.u } });
      req.flash("info", "del");
      res.redirect("/kategori");
    } catch (err) {
      console.log(err);
      req.flash("info", "failed");
      res.redirect("/kategori");
    }
        
  }
}
export default new kategoriService();
