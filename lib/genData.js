const {DATA, randInt, DELETE_PROPERTIES} = require('./mapping');

const fkArrays = {};

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
            if (colName.toUpperCase().includes('VERSION')) return DATA.version();
            if (colName.toUpperCase().includes('URL')) return DATA.url();
            if (colName.toUpperCase().includes('MD5')) return DATA.md5();
            if (colName.toUpperCase().includes('TYPE') && tableName.toUpperCase().includes('REPORT')) return DATA.reportType();
            return DATA.varchar(type.length);
        
        case 'int':
            return DATA.int(type.length);
        
        case 'json':
            return DATA.json;
        
        case 'datetime':
            if (colName.toUpperCase() === 'DELETEDAT') return null;
            return DATA.datetime();
        
        case 'text':
            return DATA.text(type.length);
        
        case 'float':
            return DATA.rating(type.length);
        default:
            return 'Wrong type';
    }
};

exports.generateData = (schema, max) => {
    Object.keys(schema).forEach(batch => {
        schema[batch].map(table => {
            // FK - table mapping
            if (table.foreignKeys){
                table.fkList = {};
                table.foreignKeys.forEach(fk => {
                    table.fkList[fk.columns[0].column] = fk.reference.table;
                });
            }
          
            // Data generation
            table.data = [];
            for (let i = 0; i < randInt(max); i++) {
                const rowData = [];
                table.columns.forEach(col => {
                    console.log(table.name);
                    rowData.push(getRandomData(col, table.name, table.fkList));
                });
                table.data.push(rowData);
            }

            // Object cleaning
            table.columnsArray = table.columns.map(col => col.name);
            DELETE_PROPERTIES.forEach(prop => delete table[prop]);
        }); 
    });

    return schema;
};
