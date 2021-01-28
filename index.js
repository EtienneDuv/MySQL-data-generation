const fs = require('fs');
const {Parser} = require('sql-ddl-to-json-schema');
const parser = new Parser('mysql');

const {generateData} = require('./lib/genData');
const {parseSchema} = require('./lib/parseSchema');

const sql = fs.readFileSync('./db.ddl', 'utf8');
const json = parser.toCompactJson(parser.feed(sql).results);

parseSchema(json);

const output = json;
fs.writeFileSync('output/schema.json', JSON.stringify(output));
// console.log(output);
