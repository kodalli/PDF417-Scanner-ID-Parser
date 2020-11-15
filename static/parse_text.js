/*  Author: Surya Kodali
Date Created: 10-30-2020
Last Modified: 11-01-2020
Description:
This program parses a text file provided by PDF-417 barcodes,
compares it AAMVA version standards, and returns formatted json
with parsed data matched to their specific fields.

Currently there is no error handling so USE WITH CAUTION.
*/

const {
    versions
} = require('process');


const fs = require('fs');

function parseFile(textFile, aamvaData) {
    let text;
    if (textFile.match(/\.[0-9a-z]{1,5}$/i) == '.txt') {
        text = fs.readFileSync(textFile, 'utf-8').replace(/\r\n/g, "\r").split(/\r/);
    } else {
        text = textFile;
    }

    let idData; // holds all AAMVA id field information
    if (aamvaData.match(/\.[0-9a-z]{1,5}$/i) == '.json') {
        idData = JSON.parse(fs.readFileSync(aamvaData, 'utf-8'));
    } else {
        throw console.error("Could not read file");
    }

    let userData = {};
    for (let line in text) {
        _id = text[line].substring(0, 3); // Know that id is first 3 characters
        for (let version in idData) {
            if (_id in idData[version]) {
                console.log(idData[version][_id] + ': ' + text[line].substr(3, text[line].length));
                userData[idData[version][_id]] = text[line].substr(3, text[line].length).trim();
                break;
            }
        }
    }
    return JSON.stringify(userData, null, 5);
};

function saveUserData(jsonContent, destinationJson) {
    fs.writeFileSync(destinationJson, jsonContent, (error) => {
        // In case of a error throw err exception. 
        if (error) throw err;
    })
};

function parseIdData(text) {
    parsedFile = parseFile(text, 'static\\AAMVA_Element_IDs.json');
    console.log("function called");
    return parsedFile;
}

exports.parseIdData = parseIdData;
// global.parseFile = parseFile('static\\license_example_RI.txt', 'static\\AAMVA_Element_IDs.json');
// console.log(global.parseFile)
//saveUserData(global.parseFile, 'user_id_data.json')