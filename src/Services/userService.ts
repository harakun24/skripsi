import { Request, Response, env } from "../Helper/express";
import base, { model } from "./baseService";
import crypto from "crypto-js";
import axios from "axios";

class userService extends base {
  async index(req: Request, res: Response) {
    this.auth(req, res);
    res.render("user", {
      title: "pengurus",
      kside: await model.kategori.findAll(),
      dside: await model.subkategori.findAll({ where: { fk_kategori: 3 } }),
      pengurus: await model.user.findAll(),
      user: req.session.user,
      layout: "admin",
      info: req.flash("info"),
    });
  }
  async find(req: Request, res: Response) {
    const de = env();
    const user = await model.user.findOne({ where: { id_user: req.params.u } });
    const key = de["salt_bitter"] + user.username;
    user.password = crypto.Rabbit.decrypt(user.password, key).toString(
      crypto.enc.Utf8
    );
    res.send(user || {});
  }

  async findAll(req: Request, res: Response) {
    try {
      res.send(await model.user.findAll());
    } catch (error) {
      console.log(error);
    }
  }

  async create(req: Request, res: Response) {
    const de = env();
    if (!req.body.username) {
      req.flash("info", "failed");
      res.redirect("/pengurus");
    } else {
      const key = de["salt_bitter"] + req.body.username;
      const baru = {
        username: req.body.username,
        password: crypto.Rabbit.encrypt(req.body.password, key).toString(),
      };

      try {
        await model.user.create(baru);
        req.flash("info", "add");
        res.redirect("/pengurus");
      } catch (err) {
        req.flash("info", "failed");
        res.redirect("/pengurus");
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const de = env();
      const key = de["salt_bitter"] + req.body.username;
      req.body.password = crypto.Rabbit.encrypt(
        req.body.password,
        key
      ).toString();
      await model.user.update(req.body, { where: { id_user: req.params.u } });
      req.flash("info", "edit");
      res.redirect("/pengurus");
    } catch (err) {
      req.flash("info", "failed");
      res.redirect("/pengurus");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await model.user.destroy({ where: { id_user: req.params.u } });
      req.flash("info", "del");
      res.redirect("/pengurus");
    } catch (error) {
      req.flash("info", "failed");
      res.redirect("/pengurus");
    }
  }

  async proses(req: Request, res: Response) {
    const phase1 = await model.user.findOne({
      where: { username: req.body.username },
    });
    if (phase1) {
      const phase2 = (
        await axios.get(
          this.base(req) + "/pengurus/id/" + phase1.dataValues.id_user
        )
      ).data;
      if (phase2.password == req.body.password) {
        phase2.type = "admin";
        req.session.user = phase2;
        req.flash("info","login");
      } else {
        if (!(await this.visitor(req, res))) req.flash("info", "failed");
      }
    } else {
      if (!(await this.visitor(req, res))) req.flash("info", "failed");
    }
    res.redirect("/");
  }

  async visitor(req: Request, res: Response) {
    let state = false;
    const phase1 = await model.visitor.findOne({
      where: { nim: req.body.username },
    });
    console.log("phase1");
    if (phase1) {
      const phase2 = (
        await axios.get(
          this.base(req) + "/visitor/id/" + phase1.dataValues.id_visitor
        )
      ).data;
      console.log("phase2 " + (phase2.password == req.body.password));

      if (phase2.password == req.body.password) {
        phase2.type = "user";
        req.session.user = phase2;
        state = true;
      }
    } 
    return state;
  }
}
require("colors");


console.log("Table services:".yellow);
console.log("--------------------------------------------".yellow);

export default new userService();
