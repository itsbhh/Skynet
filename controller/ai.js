const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const aiResponse = require("../dbmodels/aiDb.js");

module.exports.index = async (req, res) => {
    res.render("main/ai.ejs");
}

module.exports.answer = async (req, res) => {
    // For text-only input, use the gemini-pro model
    let { input } = req.body.ai;
    input = input.toLowerCase();
    let url = req.file.path;
    let filename = req.file.filename
    const prompt = input;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const aiData = new aiResponse({
        response: text,
        file: {
            url: url,
            filename: filename
        }
    });
    if (url) {
        const config = {
            headers: {
                "x-api-key": process.env.PDF_API_KEY,
                "Content-Type": "application/json",
            },
        };

        const pdfUrl = {
            url: url,
        };

        axios
            .post("https://api.chatpdf.com/v1/sources/add-url", pdfUrl, config)
            .then((response) => {
                const Id = response.data.sourceId;
                console.log("Source ID:", Id);
                const data = {
                    sourceId: Id,
                    messages: [
                        {
                            role: "user",
                            content: "What is this pdf?",
                        },
                    ],
                };
                axios
                    .post("https://api.chatpdf.com/v1/chats/message", data, config)
                    .then((response) => {
                        pdfAns = response.data.content;
                        console.log("Result:", pdfAns);
                        res.send(pdfAns);
                    })
                    .catch((error) => {
                        console.error("Error:", error.message);
                        console.log("Response:", error.response.data);
                    });
            })
            .catch((error) => {
                console.log("Error:", error.message);
                console.log("Response:", error.response.data);
            });
    }
    else {
        console.log(aiData);
        await aiData.save();
        res.send(text);
        console.log(text);

    }

};