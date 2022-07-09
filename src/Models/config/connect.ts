import {Sequelize} from "sequelize";
import { config } from "dotenv";

config({ path: ".env" });

const db:any = {connect:{},type:{}};
// app
try {
  const connect = new Sequelize(
    process.env["DB.DATABASE"]!,
    process.env["DB.USER"]!,
    process.env["DB.PASSWORD"],
    {
      host: process.env["DB.HOST"],
      dialect: "mysql",
      logging: false,
      port: 3306,
      pool: {
        max: 6,
        min: 0,
        acquire: 300000,
        idle: 10000,
      },
    }
  );

  db.connect = connect;
  db.type = Sequelize;
  
} catch (error) {
  console.log(error);
}

export default db;
