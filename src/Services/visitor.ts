import { Request, Response, env } from "../Helper/express";
import base, { model } from "./baseService";
import crypto from "crypto-js";

class visitorService extends base {
  index(req: Request, res: Response) {
    // res.sendStatus(200);
    res.send("visitor service");
  }

  async find(req: Request, res: Response) {
    try {
      const de = env();
      const visitor = await model.visitor.findByPk(req.params.u);
      const key = de["salt_bitter"] + visitor.dataValues.nim;
      visitor.dataValues.password = crypto.Rabbit.decrypt(
        visitor.dataValues.password,
        key
      ).toString(crypto.enc.Utf8);
      res.send(visitor || {});
    } catch (err) {
      console.log(err);
      res.status(500).send({ ps: `errornya, ${err}` });
    }
  }

  async nim(req: Request, res: Response) {
    res.send(
      (await model.visitor.findOne({ where: { nim: req.params.u } })) || {}
    );
    // .then((data: Object) => res.send(data || {}))
  }

  async findAll(req: Request, res: Response) {
    res.send({ data: await model.visitor.count() });
  }

  async create(req: Request, res: Response) {
    const pattern = /[0-9]{2}.[0-9]{2}.[0-9]{4}/;
    if (!req.body.nim.match(pattern)) {
      req.flash("info", "failed");
      res.redirect("/");
    }
    const phase1 = await model.visitor.findOne({
      where: { nim: req.body.nim },
    });
    if (phase1) {
      req.flash("info", "exist");
      res.redirect("/");
    } else
      try {
        const de = env();
        const key = de["salt_bitter"] + req.body.nim;
        req.body.password = crypto.Rabbit.encrypt(
          req.body.password,
          key
        ).toString();
        await model.visitor.create({
          ...req.body,
          status: "stage1",
        });
        req.flash("info", "success");
        res.redirect("/");
      } catch (error) {
        console.log(error);
        req.flash("info", "failed");
        res.redirect("/");
      }
  }

  async update(req: Request, res: Response) {
    try {
      const de = env();
      console.log(req.body);
      console.log(req.params.u);
      const key = de["salt_bitter"] + req.body.nim;
      req.body.password = crypto.Rabbit.encrypt(
        req.body.password,
        key
      ).toString();
      await model.visitor.update(req.body, { where: { id_visitor: req.params.u } });
      req.flash("info", "edit");
      res.redirect("/");
    } catch (err) {
      req.flash("info", "failed");
      res.redirect("/");
    }
  }

  async delete(req: Request, res: Response) {
    await model.visitor.destroy({
      where: { id_visitor: req.params.u },
    });
    req.flash("info", "del");
    res.redirect("/dashboard");
  }
}
export default new visitorService();
