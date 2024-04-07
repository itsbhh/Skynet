import { GoogleGenerativeAI } from "@google/generative-ai";
const api= document.getElementById("api").value;
const genAI = new GoogleGenerativeAI(api);

function formatText(text) {
    // Bold text: **text** or __text__
    text = text.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>');
    // Italic text: *text* or _text_
    text = text.replace(/ \*(.*?)\* |_(.*?)_/g, '<em>$1$2</em>');
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
document.addEventListener("DOMContentLoaded", (event) => {
    console.log('click');
    run(input);
});

function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}
// Access your API key (see "Set up your API key" above)

async function run(input) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = input;
    const result = await model.generateContentStream(prompt);
    let text = '';
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        let show = document.querySelector('.ai-res');
        text += chunkText;
        text = formatText(text);
        text = decodeEntities(text);
        show.innerHTML = text;
    }
}
