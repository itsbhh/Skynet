const searchQ = require('../dbmodels/queryDb.js');
const aiResponse = require('../dbmodels/aiDb.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const axios = require('axios');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

module.exports.index = (req, res) => {
    res.render('main/index.ejs');
};

module.exports.searchIndex = async (req, res) => {
    let { q } = req.body.search;
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, filename);
    q = q.toLowerCase();
    let see = await searchQ.findOne({ "result.query": q }); // Use findOne instead of find
    console.log(see);
    if (see && see.result && see.result.query) {
        const condition = see.result.query;
        console.log(condition);
        if (q == condition) {
            console.log("Condition 1.1 Triggered");
            //AI Code to be written in searchResult.ejs
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
            },
            file: {
                url: url,
                filename: filename
            }
        });
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

};