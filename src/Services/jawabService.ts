import { Request, Response } from "../Helper/express";
import base, { model } from "./baseService";

class jawabService extends base {
  index(req: Request, res: Response) {
    // res.sendStatus(200);
    res.send("jawabService service");
        
  }

  find(req: Request, res: Response) {
    model.jawab
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
    if (!req.body.jawaban) {
      req.flash("info", "failed");
      res.redirect("/tanya");
    } else {
      const baru = {
        fk_tanya: req.body.fk_tanya,
        fk_divisi: req.body.fk_divisi,
        jawaban: req.body.jawaban,
        nilai: req.body.nilai,
      };
      model.jawab
        .create(baru)
        .then((data: Object) => {
          req.flash("info", "add");
          res.redirect("/tanya");
        })
        .catch((err: Object) => {
          console.log(err);
          req.flash("info", "failed");
          res.redirect("/tanya");
        });
    }
        
  }

  update(req: Request, res: Response) {
    model.jawab
      .update(req.body, {
        where: { id_jawab: req.params.u },
      })
      .then((data: Object) => {
        req.flash("info", "edit");
        res.redirect("/tanya");
      })
      .catch((err: Object) => {
        req.flash("info", "failed");
        console.log(err);
        res.redirect("/tanya");
      });
          
  }

  delete(req: Request, res: Response) {
    model.jawab
      .destroy({
        where: { id_jawab: req.params.u },
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
export default new jawabService();
