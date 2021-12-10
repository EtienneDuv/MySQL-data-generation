/* eslint-disable no-case-declarations */
const RandExp = require('randexp');
const {DATA} = require('./mapping');
const pkData = {};
const pkArrays = {};

const randInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomData = (col, tableName, tableFks) => {
    const {name: colName, type} = col;
    if (!pkData[tableName]) pkData[tableName] = [];
    let isPk = false;
    let isFk = false;
    if (Object.keys(pkArrays).includes(tableName)) {
        if (pkArrays[tableName] === colName) isPk = true;
    }
    if (tableFks) {
        if (Object.keys(tableFks).includes(colName)) isFk = true;
    }

    switch (type.datatype) {

        case 'char':
            let char = '';
            if (isFk) return DATA.elementOfArray(pkData[tableFks[colName]]);
            if (colName.toUpperCase().includes('MD5')) char = DATA.md5();
            if (colName.toUpperCase().substr(colName.length-2) === 'ID') {
                if (type.length === 16) char = new RandExp(/[0-9A-F]{16}/).gen();
                else char = DATA.uuid();
            }
            if (isPk) pkData[tableName].push(char);
            return char;
        
        case 'varchar':
            let varchar = '';
            if (colName.toUpperCase().includes('VERSION')) varchar = DATA.version();
            if (colName.toUpperCase().includes('URL')) varchar = DATA.url();
            if (colName.toUpperCase().includes('MD5')) varchar = DATA.md5();
            if (colName.toUpperCase().includes('TYPE') && tableName.toUpperCase().includes('REPORT')) varchar = DATA.reportType();
            if (tableName.toUpperCase() === 'TAGCATEGORIES' && colName.toUpperCase() === 'NAME') {
                varchar = DATA.tagCategoryName();
            }
            if (isFk) varchar = DATA.elementOfArray(pkData[tableFks[colName]]);
            if (varchar == '') varchar = DATA.varchar(type.length).substr(0, 20);
            varchar = varchar.replace('\n', ' ');
            if (isPk) pkData[tableName].push(varchar);
            return varchar;
        
        case 'int':
            let int = 0;
            if (isFk) return DATA.elementOfArray(pkData[tableFks[colName]]);
            if (type.width === 1) int = DATA.boolean() ? 1 : 0;
            else if (type.width === 5) int = DATA.int(65000);
            else {
                int = '';
                for (let i = 0; i < randInt(type.width, 1); i++) {
                    int += DATA.int(9);
                }
                int = int.toString().substring(0, 4);
            }
            if (isPk) pkData[tableName].push(int);
            return int;

        case 'json':
            if (['previews', 'screenshots'].includes(colName)) {
                const arr = []
                for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
                    arr.push({
                        "url": "https://picsum.photos/500/500", 
                        "contentType": "image/png",
                        "width": 500, 
                        "height": 500
                    });
                }
                return arr;
            }
            return DATA.json;
        
        case 'datetime':
            if (colName.toUpperCase() === 'DELETEDAT') return 'null';
            const date =  DATA.datetime().toISOString();
            return date.substring(0, 10) +' '+ date.substring(11,19);
        
        case 'text':
            return DATA.varchar(type.length).substr(0, 50);
        
        case 'float':
            return DATA.rating();

        case 'double':
            return DATA.rating();

        case 'enum':
            return DATA.oneOf(type.values)

        default:
            console.log('Unrecognized type', type.datatype)
            return 'Unrecognized type';
    }
};

exports.generateData = (schema, maxRows) => {
    Object.keys(schema).forEach(batch => {
        // PK - FK
        schema[batch].map(table => {
            if (table.primaryKey){
                if (table.primaryKey.columns.length === 1) {
                    pkArrays[table.name] = table.primaryKey.columns[0].column;
                }
            }
            if (table.foreignKeys){
                table.fkArray = {};
                table.foreignKeys.forEach(fk => {
                    table.fkArray[fk.columns[0].column] = fk.reference.table;
                });
            }
        }); 

        schema[batch].map(table => {
            // Data generation
            table.data = [];
            // for (let i = 0; i < randInt(maxRows)+5; i++) {
            for (let i = 0; i < maxRows; i++) {
                const rowData = [];
                table.columns.forEach(col => {
                    rowData.push(getRandomData(col, table.name, table.fkArray));
                });
                table.data.push(rowData);
            }

            // Object cleaning
            table.columnsArray = table.columns.map(col => col.name);
        }); 
    });

    return schema;
};
