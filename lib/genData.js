/* eslint-disable no-case-declarations */
const {DATA} = require('./mapping');
const fkArrays = {};

const randInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomData = (col, tableName, tableFk) => {
    const {name: colName, type} = col;
    if (!fkArrays[tableName]) fkArrays[tableName] = [];

    switch (type.datatype) {
        
        case 'char':
            if (colName.toUpperCase().includes('MD5')) return DATA.md5();
            if (colName.toUpperCase().includes('ID')) {
                if (tableFk) {
                    if (Object.keys(tableFk).includes(colName)) {
                        const refTable = tableFk[colName];
                        return DATA.arrayElement(fkArrays[refTable]);
                    }
                }

                const uuid = DATA.uuid();
                fkArrays[tableName].push(uuid);
                return uuid;
            }
            return;
        
        case 'varchar':
            let varchar = '';
            if (colName.toUpperCase().includes('VERSION')) varchar = DATA.version();
            if (colName.toUpperCase().includes('URL')) varchar = DATA.url();
            if (colName.toUpperCase().includes('MD5')) varchar = DATA.md5();
            if (colName.toUpperCase().includes('TYPE') && tableName.toUpperCase().includes('REPORT')) varchar = DATA.reportType();
            if (varchar == '') varchar = DATA.varchar(type.length).substr(0, 20);
            varchar = varchar.replace('\n', ' ');
            return varchar;
        
        case 'int':
            if (type.width === 1) return DATA.boolean() ? 1 : 0;
            else {
                let int = '';
                for (let i = 0; i < randInt(type.width, 1); i++) {
                    int += DATA.int(9);
                }
                return int.toString().substring(0, 5);
            }
        
        case 'json':
            return DATA.json;
        
        case 'datetime':
            if (colName.toUpperCase() === 'DELETEDAT') return 'null';
            const date =  DATA.datetime().toISOString();
            return date.substring(0, 10) +' '+ date.substring(11,19);
        
        case 'text':
            return DATA.varchar(type.length).substr(0, 50);
        
        case 'float':
            return DATA.rating();
        default:
            return 'Wrong type';
    }
};

exports.generateData = (schema, maxRows) => {
    Object.keys(schema).forEach(batch => {
        schema[batch].map(table => {
            // FK - table mapping
            if (table.foreignKeys){
                table.fkArray = {};
                table.foreignKeys.forEach(fk => {
                    table.fkArray[fk.columns[0].column] = fk.reference.table;
                });
            }
          
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
