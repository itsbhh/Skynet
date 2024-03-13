require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const axios = require('axios');
const path = require("path");
const ejsMate = require("ejs-mate");
const searchQ = require("./dbmodels/queryDb.js");
const aiResponse = require("./dbmodels/aiDb.js");
const bodyParser = require("body-parser");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine('ejs', ejsMate);

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


app.get("/", (req, res) => {
    res.render('main/index.ejs');
});

//SEARCH route
app.post("/search", async (req, res) => {
    let { q } = req.body;
    q = q.toLowerCase();
    let see = await searchQ.findOne({ "result.query": q }); // Use findOne instead of find
    console.log(see);
    if (see && see.result && see.result.query) {
        const condition = see.result.query;
        console.log(condition);
        if (q == condition) {
            console.log("Condition 1.1 Triggered");
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = q;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const aiData = aiResponse.findOne({ response: text });
            if (text == aiData) {
                text = aiData;
                console.log("AI DATA RETAINED");
            }
            else {
                let aiSays = new aiResponse({
                    query: q,
                    response: text
                })
                console.log("AI DATA INITIALISED", aiData);
                await aiSays.save();
                console.log(text);
            }
            res.send(see);
            // Update the database with fresh data from API for future searches
            const apiKey = process.env.SEARCH_API_KEY;
            const cx = process.env.SEARCH_ID;
            const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(q)}&safe=active`;
            const searchResponse = await axios.get(apiUrl);
            const ros = searchResponse.data;

            // Update existing document with new data
            see.result.data = ros;
            await see.save();

            console.log("Database updated with fresh data for query:", q);
        }
    } else {
        const search = new searchQ({
            query: q,
            result: {
                query: q
            }
        });
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = q;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const aiData = aiResponse.findOne({ response: text });
        if (text == aiData) {
            text = aiData;
            console.log("AI DATA RETAINED");
        }
        else {
            let aiSays = new aiResponse({
                query: q,
                response: text
            })
            console.log("AI DATA INITIALISED", aiData);
            await aiSays.save();
            console.log(text);
        }
        console.log(search);
        const apiKey = process.env.SEARCH_API_KEY;
        const cx = process.env.SEARCH_ID;
        const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(q)}&safe=active`;
        const searchResponse = await axios.get(apiUrl);
        const ros = searchResponse.data;
        search.result.data = ros;
        await search.save();
        console.log("Condition 2 Triggered");
        res.send(search);
    }

});

app.get("/search?q", async (req, res) => {
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
    ai = ai.toLowerCase();
    const prompt = ai;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const aiData = new aiResponse({
        response: text,
    });
    console.log(aiData);
    await aiData.save();
    res.send(text);
    console.log(text);
});


