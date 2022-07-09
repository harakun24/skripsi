import { Request, Response } from "../Helper/express";
import base, { model } from "./matrix";

class mkategoriService extends base {
  async index(req: Request, res: Response) {
    this.auth(req, res);

    const count0 = await model.kategori.count();
    let count = await model.mkategori.count();

    if(!this.reform(count0,count))
    {
      count=0;
      await model.mkategori.destroy({where:{},truncate:true})
    }

    let kat = await model.kategori.findAll();
    kat = kat.map((item: any, index: number) => {
      return {
        id: item.id_kategori,
        kategori: item.kategori,
      };
    });
    if (count < 1) {
      for (let i = 0; i < kat.length - 1; i++) {
        for (let j = i + 1; j < kat.length; j++) {
          const pair = {
            k1: kat[i].id,
            k2: kat[j].id,
            nilai: j + 1,
          };
          await model.mkategori.create(pair);
        }
      }
    }
    const mkat = await model.mkategori.findAll({
      include: [
        { model: model.kategori, as: "key1" },
        { model: model.kategori, as: "key2" },
      ],
    });
    const hasil = await this.matrix(kat, mkat, "kat");
    res.render("mkategori", {
      title: "matriks kategori",
      result: hasil.result,
      mkat,
      kside: await model.kategori.findAll(),
      dside: await model.subkategori.findAll({ where: { fk_kategori: 3 } }),
      kat: hasil.mat,
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
      await model.mkategori.update(
        { nilai: req.params.n },
        {
          where: { id_mkategori: req.params.u },
        }
      );
      req.flash("info", "edit");
      res.redirect("/m/kategori");
    } catch (err) {
      req.flash("info", "failed");
      res.redirect("/m/kategori");
    }
  }

  delete(req: Request, res: Response) {
    res.sendStatus(200);
  }

  async reset(req: Request, res: Response) {
    await model.mkategori.destroy({where:{},truncate:true});
    res.redirect("/m/kategori");
  }
}
export default new mkategoriService();
