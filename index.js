require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const axios = require('axios');
const path = require("path");
const ejsMate = require("ejs-mate");
const searchQ = require("./dbmodels/queryDb.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/skynet');
}

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});


const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.get("/", (req, res) => {
    res.render('main/index.ejs');
});

//SEARCH route
app.post("/search", async (req, res) => {
    let { q } = req.body;
    const search = new searchQ({
        query: q,
    });
    await search.save();
    console.log(search);
    const apiKey = process.env.SEARCH_API_KEY; // Replace 'YOUR_API_KEY' with your actual API key
    const cx = process.env.SEARCH_ID; // Replace 'YOUR_CX' with your actual custom search engine ID
    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(q)}`;
    const searchResponse = await axios.get(apiUrl);
    console.log("Search response:", searchResponse.data);
    res.send(search);
});

app.get("/search/:q", async (req, res) => {
    let
})

//SKYNET AI ai route

app.get("/ai", (req, res) => {
    res.render("main/ai.ejs");
});


app.post("/ai", async (req, res) => {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    let { ai } = req.body;

    const prompt = ai;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
    console.log(text);
});

app.listen(8080, () => {
    console.log("Server is working");
});
