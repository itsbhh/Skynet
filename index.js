require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});


const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.get("/", (req, res) => {
    res.send('Root folder');
})

//SKYNET AI ai route

app.get("/ai", (req, res) => {
    res.render("main/ai.ejs");
})

app.post("/ai", async (req, res) => {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    let { ai } = req.body;

    const prompt = ai;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
});

app.listen(8080, () => {
    console.log("Server is working");
});
