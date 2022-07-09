"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: ".env" });
const db = { connect: {}, type: {} };
try {
    const connect = new sequelize_1.Sequelize(process.env["DB.DATABASE"], process.env["DB.USER"], process.env["DB.PASSWORD"], {
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
    });
    db.connect = connect;
    db.type = sequelize_1.Sequelize;
}
catch (error) {
    console.log(error);
}
exports.default = db;
