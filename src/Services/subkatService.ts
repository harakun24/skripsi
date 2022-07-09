import { Request, Response } from "../Helper/express";
import base, { model } from "./baseService";

class subkatService extends base {
  async index(req: Request, res: Response) {
    this.auth(req, res);
    res.render("subkategori", {
      title: "sub kategori",
      kside: await model.kategori.findAll(),
      dside: await model.subkategori.findAll({ where: { fk_kategori: 3 } }),
      subkategori: await model.subkategori.findAll({
        include: [
          {
            model: model.kategori,
          },
        ],
      }),
      user: req.session.user,
      layout: "admin",
      info: req.flash("info"),
    });
  }

  find(req: Request, res: Response) {
    model.subkategori
      .findByPk(req.params.u)
      .then((data: Object) => res.send(data || {}))
      .catch((err: Object) => res.status(500).send({ ps: `errornya, ${err}` }));
  }

  findAll(req: Request, res: Response) {
    res.sendStatus(200);
  }

  create(req: Request, res: Response) {
    if (!req.body.subkategori) {
      req.flash("info", "failed");
      res.redirect("/subkategori");
    } else {
      const baru = {
        subkategori: req.body.subkategori,
        fk_kategori: req.body.kategori,
      };

      model.subkategori
        .create(baru)
        .then((data: Object) => {
          req.flash("info", "add");
          res.redirect("/subkategori");
        })
        .catch((err: Object) => {
          req.flash("info", "failed");
          res.redirect("/subkategori");
        });
    }
  }

  update(req: Request, res: Response) {
    model.subkategori
      .update(req.body, {
        where: { id_sub: req.params.u },
      })
      .then((data: Object) => {
        req.flash("info", "edit");
        res.redirect("/subkategori");
      })
      .catch((err: Object) => {
        req.flash("info", "failed");
        res.redirect("/subkategori");
      });
  }

  async delete(req: Request, res: Response) {
    await model.msub.destroy({where:{sub1:req.params.u}});
    await model.msub.destroy({where:{sub2:req.params.u}});
    model.subkategori
      .destroy({
        where: { id_sub: req.params.u },
      })
      .then((data: Object) => {
        req.flash("info", "del");
        res.redirect("/subkategori");
      })
      .catch((err: Object) => {
        console.log(err)
        req.flash("info", "failed");
        res.redirect("/subkategori");
      });
  }
}
export default new subkatService();
