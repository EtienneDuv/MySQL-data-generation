const fs = require('fs');
const {Parser} = require('sql-ddl-to-json-schema');
const parser = new Parser('mysql');

const {parseSchema} = require('./lib/parseSchema');
const {generateData} = require('./lib/genData');


const sql = fs.readFileSync('./db.sql', 'utf8');
const json = parser.toCompactJson(parser.feed(sql).results);

const parsedSchema = parseSchema(json);
generateData(parsedSchema, 50);

const output = json;
fs.writeFileSync('output/schema.json', JSON.stringify(output));
// console.log(output);
