"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("../Helper/express");
require("colors");
const userRouter_1 = require("./userRouter");
const kategoriRouter_1 = require("./kategoriRouter");
const divisiRouter_1 = require("./divisiRouter");
const subkatRouter_1 = require("./subkatRouter");
const tanyaRouter_1 = require("./tanyaRouter");
const jawabRouter_1 = require("./jawabRouter");
const mkategoriRouter_1 = require("./mkategoriRouter");
const msubRouter_1 = require("./msubRouter");
const dashboardRouter_1 = require("./dashboardRouter");
const visitor_1 = require("./visitor");
const mdivRouter_1 = require("./mdivRouter");
const defaultRouter_1 = require("./defaultRouter");
console.log("--------------------------------------------".yellow);
class routerCollector {
    constructor() {
        this.list = [];
        this.router = (0, express_1.Router)();
        console.log("\nTable routers:".cyan);
        console.log("------------------------------------------".green);
        this.list.push({ to: "/pengurus", from: new userRouter_1.userRouter() });
        this.list.push({ to: "/kategori", from: new kategoriRouter_1.kategoriRouter() });
        this.list.push({ to: "/divisi", from: new divisiRouter_1.divisiRouter() });
        this.list.push({ to: "/subkategori", from: new subkatRouter_1.subkatRouter() });
        this.list.push({ to: "/tanya", from: new tanyaRouter_1.tanyaRouter() });
        this.list.push({ to: "/jawab", from: new jawabRouter_1.jawabRouter() });
        this.list.push({ to: "/m/kategori", from: new mkategoriRouter_1.mkategoriRouter() });
        this.list.push({ to: "/m/sub", from: new msubRouter_1.msubRouter() });
        this.list.push({ to: "/m/divisi", from: new mdivRouter_1.mdivRouter() });
        this.list.push({ to: "/", from: new defaultRouter_1.defaultRouter() });
        this.list.push({ to: "/dashboard", from: new dashboardRouter_1.dashboardRouter() });
        this.list.push({ to: "/visitor", from: new visitor_1.visitorRouter() });
        console.log("------------------------------------------".green);
    }
    getList() {
        for (const handler of this.list) {
            this.router.use(handler.to, handler.from.router);
        }
        return this.router;
    }
}
exports.default = routerCollector;
const router = new routerCollector().getList();
exports.router = router;
