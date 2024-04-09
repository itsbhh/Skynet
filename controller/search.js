const searchQ = require('../dbmodels/queryDb.js');
const { AIData } = require('../dbmodels/aiDb.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');


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
            // res.send(see);
            res.render('main/searchresult.ejs', { see, q });
            // Update the database with fresh data from API for future searches
            const apiKey = process.env.SEARCH_API_KEY;
            const cx = process.env.SEARCH_ID;
            const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(q)}&safe=active&suggest=true`;
            const searchResponse = await axios.get(apiUrl);
            const ros = searchResponse.data;
            console.log(see);
            // Update existing document with new data
            see.result.data = ros;
            await see.save();

            console.log("Database updated with fresh data for query:", q);
        }
    } else {
        const see = new searchQ({
            query: q,
            result: {
                query: q
            },
        });
        console.log(see);
        const apiKey = process.env.SEARCH_API_KEY;
        const cx = process.env.SEARCH_ID;
        const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(q)}&safe=active&suggest=true`;
        const searchResponse = await axios.get(apiUrl);
        const ros = searchResponse.data;
        see.result.data = ros;
        await see.save();
        console.log("Condition 2 Triggered");
        res.render('main/searchresult.ejs', { see, q });
    }

};