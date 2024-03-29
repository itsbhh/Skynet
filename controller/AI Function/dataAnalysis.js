const xlsx = require('xlsx');
const fs = require('fs').promises;
const readline = require('readline');

// Function to parse Excel files and perform analysis
async function analyzeExcel(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const analysisResult = {};

    data.forEach(row => {
        Object.keys(row).forEach(key => {
            const value = row[key];
            if (!analysisResult[key]) {
                analysisResult[key] = {};
            }
            if (!analysisResult[key][value]) {
                analysisResult[key][value] = 1;
            } else {
                analysisResult[key][value]++;
            }
        });
    });

    const labels = Object.keys(analysisResult);
    const values = Object.values(analysisResult);

    return { labels, values };
}


// Function to get user input for tables and columns

module.exports = {
    analyzeExcel,
};
