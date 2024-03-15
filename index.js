require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const ExpressError = require("./utils/ExpressError.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine('ejs', ejsMate);
const searchRouter = require("./routes/search.js");
const aiRouter=require('./routes/ai.js')

app.listen(3000, () => {
    console.log("Server is working");
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/skynet');
}

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

app.use("/home", searchRouter);
app.use("/ai", aiRouter);




//BASIC ROUTES

app.get("/about", (req, res) => {
    res.render("basic/about.ejs");
});

app.get("/feedback", (req, res) => {
    res.render("basic/feedback.ejs");
});

app.post("/feedback", async (req, res) => {
    //To Be Written
});

app.get("/privacy", (req, res) => {
    res.render("basic/privacy.ejs");
});

app.get("")



//ERROR Routes
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong!!" } = err;
    res.status(statusCode).render("error.ejs", { err });
});
