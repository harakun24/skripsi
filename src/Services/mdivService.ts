import { Request, Response } from "../Helper/express";
import base, { model } from "./matrix";

class mdivService extends base {

  async index(req: Request, res: Response) {
    this.auth(req, res);

    let count0 = await model.divisi.count();
    if (count0 < 3) {
      req.flash("info", "div");
      res.redirect("/divisi");
    }
    if (!req.params.num) {
      return res.redirect("/");
    }

    let div = await model.divisi.findAll();
    let count = await model.mdiv.count({
      where: {
        sub: req.params.num,
      },
    });
    if (!this.reform(count0, count)) {
      count = 0;
      await model.mkategori.destroy({
        where: {
          sub: req.params.num,
        },
        truncate: true,
      });
    }
    div = div.map((item: any, index: number) => {
      return {
        id: item.id_divisi,
        divisi: item.divisi,
      };
    });
    if (count < 1) {
      for (let i = 0; i < div.length - 1; i++) {
        for (let j = i + 1; j < div.length; j++) {
          const pair = {
            d1: div[i].id,
            d2: div[j].id,
            sub: req.params.num,
            nilai: j + 1,
          };
          await model.mdiv.create(pair);
        }
      }
    }
    const mdiv = await model.mdiv.findAll({
      where: {
        sub: req.params.num,
      },
      include: [
        {
          model: model.divisi,
          as: "key1",
        },
        {
          model: model.divisi,
          as: "key2",
        },
        {
          model: model.subkategori,
          as: "subs",
        },
      ],
    });
    const { result } = await this.matrix(div, mdiv, "div");
    // console.log(sub);
    const bread = await model.subkategori.findByPk(req.params.num);
    res.render("mdiv", {
      title: "matriks divisi",
      result,
      bread: bread.dataValues,
      mkat: mdiv,
      kat: div,
      id_reset: req.params.num,
      kside: await model.kategori.findAll(),
      dside: await model.subkategori.findAll({ where: { fk_kategori: 3 } }),
      info: req.flash("info"),
      user: req.session.user,
      layout: "admin",
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

  async update(req: Request, res: Response) {
    try {
      await model.mdiv.update(
        { nilai: req.params.n },
        {
          where: { id_mdiv: req.params.u },
        }
      );
      req.flash("info", "edit");
      res.redirect(`/m/divisi/${req.params.m}`);
    } catch (err) {
      req.flash("info", "failed");
      res.redirect(`/m/divisi/${req.params.m}`);
    }
  }

  delete(req: Request, res: Response) {
    res.sendStatus(200);
  }

  async reset(req: Request, res: Response) {
    await model.mdiv.destroy({ where: { sub: req.params.u } });
    console.log(`mdiv sub: ${req.params.u}  reset`);
    res.redirect("/m/divisi/" + req.params.u);
  }
}
export default new mdivService();
