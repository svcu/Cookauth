const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes/router");
require("dotenv").config();
require("./config/db.js")

const app = express();


app.use(router);
app.use(express.json());
app.use(cookieParser());

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), ()=>{
    console.log("App running in port: ", app.get("port"))
})