"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("");
const express = require("express");
const connectionDB = require("./db.ts");
const app = express();
app.get("/", (req, res) => {
    res.send("hello route");
});
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectionDB();
            console.log("db is connected");
            app.listen(3000, () => {
                console.log("App is listening on port 3000");
            });
        }
        catch (err) {
            console.error(err);
            console.log("something wrong happen");
        }
    });
}
startApp();
