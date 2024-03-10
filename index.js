require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

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
    res.send('Root route');
})

//SKYNET AI ai route

app.get("/ai", (req,res)=>{
    res.send("AI working");
})

app.post("/ai", async (req, res) => {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = "Write a story about a magic backpack."

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
});

app.listen(8080, () => {
    console.log("Server is working");
});
