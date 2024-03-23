const xlsx = require('xlsx');
const fs = require('fs').promises;
const readline = require('readline');

// Function to parse Excel files and perform analysis
async function analyzeExcel(filePath, tables, columns) {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const analysisResult = {};

    data.forEach(row => {
        Object.keys(row).forEach(key => {
            if (tables.includes(key) && columns.includes(row[key])) {
                const value = row[key];
                if (!analysisResult[key]) {
                    analysisResult[key] = {};
                }
                if (!analysisResult[key][value]) {
                    analysisResult[key][value] = 1;
                } else {
                    analysisResult[key][value]++;
                }
            }
        });
    });

    return analysisResult;
}

// Function to get user input for tables and columns
async function getUserInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const tables = await new Promise(resolve => {
        rl.question('Enter tables (comma-separated): ', answer => {
            resolve(answer.split(',').map(table => table.trim()));
        });
    });

    const columns = await new Promise(resolve => {
        rl.question('Enter columns (comma-separated): ', answer => {
            resolve(answer.split(',').map(column => column.trim()));
        });
    });

    rl.close();

    return { tables, columns };
}

module.exports = {
    analyzeExcel,
    getUserInput
};
