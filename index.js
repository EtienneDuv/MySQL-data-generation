const fs = require('fs');
const {Parser} = require('sql-ddl-to-json-schema');
const parser = new Parser('mysql');

const {parseSchema} = require('./lib/parseSchema');
const {generateData} = require('./lib/genData');
const maxNumber = 50;


const sql = fs.readFileSync('./db.sql', 'utf8');
const json = parser.toCompactJson(parser.feed(sql).results);

const parsedSchema = parseSchema(json);
const jsonData = generateData(parsedSchema, maxNumber);

const output = jsonData;
fs.writeFileSync('schema.json', JSON.stringify(output));
