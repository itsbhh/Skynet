const searchQ = require('../dbmodels/queryDb.js');
const { AIData } = require('../dbmodels/aiDb.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const axios = require('axios');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });


function formatText(text) {
    // Bold text: **text** or __text__
    text = text.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>');
    // Italic text: *text* or _text_
    text = text.replace(/\* (.*?)\* |_(.*?)_/g, '<em>$1$2</em>');
    // Strikethrough text: ~~text~~
    text = text.replace(/~~(.*?)~~/g, '<s>$1</s>');
    // Monospace text: `text`
    text = text.replace(/`(.*?)`/g, '<code>$1</code>');
    // Blockquotes: > text
    text = text.replace(/^> (.*)/gm, '<blockquote>$1</blockquote>');
    // Ordered lists: 1. text
    text = text.replace(/^(\d+\..*?$)/gm, '<ol>$1</ol>');
    // Unordered lists: - text or + text or * text
    text = text.replace(/^(-|\+|\*).*?$/gm, '<ul>$&</ul>');
    // Horizontal rules: ---
    text = text.replace(/^\s*---\s*$/gm, '<hr>');
    // Links: [text](URL)
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    // Images: ![alt text](image URL)
    text = text.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
    // Code blocks: ```
    text = text.replace(/```([\s\S]*?)```/g, '<pre>$1</pre>');
    // Inline code: `text`
    text = text.replace(/`(.*?)`/g, '<code>$1</code>');
    // Tables: | Header 1 | Header 2 |
    text = text.replace(/^\|(.*?)\|$/gm, '<table><tr>$1</tr></table>');
    // Adjust spacing to remove overspacing
    text = text.replace(/\n\s*\n/g, '\n');
    // Wrap text in <p> tags to preserve whitespace and line breaks
    text = '<p>' + text.replace(/\n/g, '</p><p>') + '</p>';
    return text;
}


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
            text = formatText(text);
            res.render('main/searchresult.ejs', { see, text, aiSays, q });
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
        res.render('main/searchresult.ejs', { search, text, aiSays, q });
    }

};