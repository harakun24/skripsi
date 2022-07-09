import { Request, Response } from "../Helper/express";
import base, { model } from "./baseService";
abstract class matrix extends base {
  async matrix(arr: any, mtr: any, opt: any) {
    const kat = arr;
    const mkat = mtr;
    const mat = [];
    for (let i = 0; i < kat.length; i++) {
      const row = [];
      for (let j = 0; j < kat.length; j++) {
        if (kat[i].id == kat[j].id) {
          row.push(1);
          continue;
        }
        let item;
        item =
          opt == "kat"
            ? await model.mkategori.findOne({
                where: { k1: kat[i].id, k2: kat[j].id },
              })
            : opt == "sub"
            ? await model.msub.findOne({
                where: { sub1: kat[i].id, sub2: kat[j].id },
              })
            : opt == "div"
            ? await model.mdiv.findOne({
                where: { d1: kat[i].id, d2: kat[j].id, sub:mkat[0].dataValues.sub },
              })
            : null;
        if (item == null) {
          item =
            opt == "kat"
              ? await model.mkategori.findOne({
                  where: { k2: kat[i].id, k1: kat[j].id },
                })
              : opt == "sub"
              ? await model.msub.findOne({
                  where: { sub2: kat[i].id, sub1: kat[j].id },
                })
              : opt == "div"
              ? await model.mdiv.findOne({
                  where: { d2: kat[i].id, d1: kat[j].id, sub:mkat[0].dataValues.sub},
                })
              : null;
          if (item != null)
            row.push(
              +parseFloat(`${1 / item.dataValues.nilai}`).toFixed(4) - 0
            );
        } else {
          row.push(item.dataValues.nilai);
        }
      }
      mat.push(row);
    }
    const total = [];
    for (let i = 0; i < kat.length; i++) {
      let temp = 0;
      for (let j = 0; j < kat.length; j++) {
        temp += mat[j][i];
      }
      total.push(temp);
    }

    const norm = [];
    for (let i = 0; i < kat.length; i++) {
      const row = [];
      for (let j = 0; j < kat.length; j++) {
        row.push(+parseFloat(`${mat[i][j] / total[j]}`).toFixed(4) - 0);
      }
      norm.push(row);
    }
    const ntotal = [];
    for (let i = 0; i < kat.length; i++) {
      ntotal.push(
        +parseFloat(`${norm[i].reduce((a, b) => a + b)}`).toFixed(4) - 0
      );
    }
    const bobot = ntotal.map((i, index) => {
      return +parseFloat(`${i / 3}`).toFixed(4) - 0;
    });
    let lambda = 0;
    for (let i = 0; i < kat.length; i++) {
      lambda += +parseFloat(`${total[i] * bobot[i]}`).toFixed(4) - 0;
    }
    const ci =
      +parseFloat(`${(lambda - kat.length) / (kat.length - 1)}`).toFixed(4) - 0;
    let ir;

    switch (kat.length) {
      case 1:
      case 2:
        ir = 0.0;
        break;
      case 3:
        ir = 0.58;
        break;
      case 4:
        ir = 0.9;
        break;
      case 5:
        ir = 1.12;
        break;
      case 6:
        ir = 1.24;
        break;
      case 7:
        ir = 1.32;
        break;
      case 8:
        ir = 1.41;
        break;
      case 9:
        ir = 1.45;
        break;
      case 10:
        ir = 1.49;
        break;
      case 11:
        ir = 1.51;
        break;
      case 12:
        ir = 1.48;
        break;
      case 13:
        ir = 1.56;
        break;
      case 14:
        ir = 1.57;
        break;
      case 15:
        ir = 1.59;
        break;
      default:
        ir = 1.59;
    }
    const cr = +parseFloat(`${ci / ir}`).toFixed(5) - 0;
    for (let i = 0; i < kat.length; i++) {
      kat[i].arr = mat[i];
      kat[i].norm = norm[i];
    }
    const result = {
      total,
      ntotal,
      bobot,
      lambda,
      ci,
      ir,
      cr,
    };
    return { mat: kat, result };
  }
  reform(first: number, last: number): boolean {
    let status = false;
    if ((first * first - first) / 2 == last) status = true;
    return status;
  }
}
export default matrix;
export { model };
