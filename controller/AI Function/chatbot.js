const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const { history } = require("../../dbmodels/aiDb");

async function run(input, _id) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    let chatHs;

    if (_id) {
        chatHs = await history.findById(_id); // Await here to get the actual value
    }

    if (!chatHs) {
        chatHs = new history({
            history: [
                {
                    role: 'User',
                    parts: [{ text: input }],
                },
                {
                    role: 'model',
                    parts: [{ text: 'Hello! I am Skynet, a multi-modal AI language model developed by Twoward Technology' }],
                },
            ],
        });
    } else {
        if (chatHs.history[0].role == 'User') {
            chatHs.history[0].parts.push({ text: input });
        }
    }

    const chat = model.startChat({
        history: chatHs.history,
        generationConfig: {
            maxOutputTokens: 1000000,
        },
    });

    const msg = input;
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();

    if (chatHs.history[1].role == 'model') {
        chatHs.history[1].parts.push({ text: text });
    }
    console.log(text);
    await chatHs.save();

    return { text, chatHs };
}

module.exports = { run }