const searchQ = require('../dbmodels/queryDb.js');
const { AIData } = require('../dbmodels/aiDb.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const axios = require('axios');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

module.exports.index = (req, res) => {
    res.render('main/index.ejs');
};

module.exports.searchIndex = async (req, res) => {
    let { q } = req.body.search;
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        console.log(url, filename);
    }
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
            const result = await model.generateContentStream(prompt);
            let text = '';
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                console.log(chunkText);
                text += chunkText;
            }
            let aiSays = new AIData({
                query: q,
                response: text
            });
            await aiSays.save();
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
        });
        const prompt = q;
        const result = await model.generateContentStream(prompt);
        let text = '';
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                console.log(chunkText);
                text += chunkText;
            }
        let aiSays = new AIData({
            query: q,
            response: text
        });
        await aiSays.save();
        console.log(search);
        const apiKey = process.env.SEARCH_API_KEY;
        const cx = process.env.SEARCH_ID;
        const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(q)}&safe=active`;
        const searchResponse = await axios.get(apiUrl);
        const ros = searchResponse.data;
        search.result.data = ros;
        await search.save();
        console.log("Condition 2 Triggered");
        res.render('main/searchresult.ejs', { search, text, aiSays });
    }

};