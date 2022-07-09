import { Request, Response } from "../Helper/express";
import base, { model } from "./baseService";

class tanyaService extends base {
  async index(req: Request, res: Response) {
    this.auth(req, res);

    res.render("tanya", {
      title: "pertanyaan",
      tanya: await model.tanya.findAll({
        include: [
          {
            model: model.jawab,
            include: [model.divisi],
          },
        ],
      }),
      kside: await model.kategori.findAll(),
      dside: await model.subkategori.findAll({ where: { fk_kategori: 3 } }),
      user: req.session.user,
      layout: "admin",
      info: req.flash("info"),
    });
  }

  find(req: Request, res: Response) {
    model.tanya
      .findByPk(req.params.u)
      .then((data: Object) => res.send(data || {}))
      .catch((err: Object) => res.status(500).send({ ps: `errornya, ${err}` }));
  }

  findAll(req: Request, res: Response) {
    model.kategori
      .findAll()
      .then((data: Object) => res.send(data || {}))
      .catch((err: Object) => res.status(500).send({ ps: `errornya, ${err}` }));
  }

  create(req: Request, res: Response) {
    if (!req.body.pertanyaan) {
      req.flash("info", "failed");
      res.redirect("/tanya");
    } else {
      const baru = {
        pertanyaan: req.body.pertanyaan,
      };

      model.tanya
        .create(baru)
        .then((data: Object) => {
          req.flash("info", "add");
          res.redirect("/tanya");
        })
        .catch((err: Object) => {
          req.flash("info", "failed");
          res.redirect("/tanya");
        });
    }
  }

  update(req: Request, res: Response) {
    model.tanya
      .update(req.body, {
        where: { id_tanya: req.params.u },
      })
      .then((data: Object) => {
        req.flash("info", "edit");
        res.redirect("/tanya");
      })
      .catch((err: Object) => {
        req.flash("info", "failed");
        res.redirect("/tanya");
      });
  }

  delete(req: Request, res: Response) {
    model.tanya
      .destroy({
        where: { id_tanya: req.params.u },
      })
      .then((data: Object) => {
        req.flash("info", "del");
        res.redirect("/tanya");
      })
      .catch((err: Object) => {
        req.flash("info", "failed");
        res.redirect("/tanya");
      });
  }
}
export default new tanyaService();
