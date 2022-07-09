import { Request, Response } from "../Helper/express";
import base, { model } from "./matrix";

class msubService extends base {
  async index(req: Request, res: Response) {
    this.auth(req, res);

    if (!req.params.num) {
      return res.redirect("/");
    }

    let sub = await model.subkategori.findAll({
      where: {
        fk_kategori: req.params.num,
      },
    });
    if (
      (await model.subkategori.count({
        where: {
          fk_kategori: req.params.num,
        },
      })) < 3
    ) {
      req.flash("info","kat");
      res.redirect("/subkategori");
    } else {
      const count = await model.msub.count({
        where: {
          sub1: sub[0].dataValues.id_sub,
        },
      });
      sub = sub.map((item: any, index: number) => {
        return {
          id: item.id_sub,
          sub: item.subkategori,
        };
      });
      if (count < 1) {
        for (let i = 0; i < sub.length - 1; i++) {
          for (let j = i + 1; j < sub.length; j++) {
            const pair = {
              sub1: sub[i].id,
              sub2: sub[j].id,
              nilai: j + 1,
            };
            await model.msub.create(pair);
          }
        }
      }
      const msub = await model.msub.findAll({
        include: [
          {
            model: model.subkategori,
            as: "key1",
            where: {
              fk_kategori: req.params.num,
            },
          },
          {
            model: model.subkategori,
            as: "key2",
            where: {
              fk_kategori: req.params.num,
            },
          },
        ],
      });
      const { result } = await this.matrix(sub, msub, "sub");
      // console.log(sub);
      const bread = await model.kategori.findByPk(req.params.num);

      res.render("msub", {
        title: "matriks subkriteria",
        result,
        bread: bread.dataValues,
        mkat: msub,
        kat: sub,
        id_kat:req.params.num,
        kside: await model.kategori.findAll(),
        dside: await model.subkategori.findAll({ where: { fk_kategori: 3 } }),
        info: req.flash("info"),
        user: req.session.user,
        layout: "admin",
      });
    }
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
      await model.msub.update(
        { nilai: req.params.n },
        {
          where: { id_msub: req.params.u },
        }
      );
      req.flash("info", "edit");
      res.redirect(`/m/sub/${req.params.m}`);
    } catch (err) {
      req.flash("info", "failed");
      res.redirect(`/m/sub/${req.params.m}`);
    }
  }

  delete(req: Request, res: Response) {
    res.sendStatus(200);
  }

  async reset(req: Request, res: Response) {
    const sub = await model.subkategori.findAll({where:{fk_kategori:req.params.u}});
    for(const val of sub){
      const id_val = val.dataValues.id_sub;
      await model.msub.destroy({where:{sub1:id_val}});
      await model.msub.destroy({where:{sub2:id_val}});
    }
    console.log(`msub ${req.params.u}  reset`)
    res.redirect("/m/sub/"+req.params.u);
  }
}
export default new msubService();
