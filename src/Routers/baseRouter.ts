import {Router} from "../Helper/express";
require("colors");

abstract class baseRouter {
    public router:Router;

    constructor(){
        this.router=Router();
        this.routing(this.router);
        console.log(`[router]`.cyan+` ${this.constructor.name}    `+`   \t | ready! |`.green);
    }
    abstract routing(r:Router):void;
}

export default baseRouter;