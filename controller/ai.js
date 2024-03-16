require('dotenv').config();
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const aiResponse = require("../dbmodels/aiDb.js");
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs').promises;
const path = require('path');



module.exports.index = async (req, res) => {
    res.render("main/ai.ejs");
}

module.exports.answer = async (req, res) => {
    // For text-only input, use the gemini-pro model
    let { input } = req.body.ai;
    input = input.toLowerCase();
    let url = req.file.path;
    let filename = req.file.filename
    if (filename) {
        const pdfPath = path.join(__dirname, '..', 'uploads', filename);
        const data = await fs.readFile(pdfPath);
        const pdfData = await pdfParse(data);
        console.log(pdfData.text);
        const aiData = new aiResponse({
            file: {
                url: url,
                filename: filename
            }
        });
        const prompt = `${input} from \n${pdfData.text}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(aiData);
        await aiData.save();
        res.send(text);
        console.log(text);


    } else {
        const aiData = new aiResponse({
            file: {
                url: url,
                filename: filename
            }
        });
        const prompt = input;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(aiData);
        await aiData.save();
        res.send(text);
        console.log(text);

    }


};