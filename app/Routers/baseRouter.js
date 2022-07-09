"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("../Helper/express");
require("colors");
class baseRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routing(this.router);
        console.log(`[router]`.cyan + ` ${this.constructor.name}    ` + `   \t | ready! |`.green);
    }
}
exports.default = baseRouter;
