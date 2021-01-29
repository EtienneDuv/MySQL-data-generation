const {DATA, randInt} = require('./mapping');

const FK = {};

const getRandomData = (col, tableName) => {
    const {name: colName, type} = col;
    if (!FK[tableName]) FK[tableName] = [];

    switch (type.datatype) {
        
        case 'char':
            if (colName.toUpperCase().includes('MD5')) return DATA.md5();
            if (colName.toUpperCase().includes('ID')) {
                const uuid = DATA.uuid();
                FK[tableName].push(uuid);
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
            table.data = [];
            for (let i = 0; i < randInt(max); i++) {
                const rowData = [];
                table.columns.forEach(col => {
                    rowData.push(getRandomData(col, table.name));
                });
                table.data.push(rowData);
            }

            console.log(table);
        }); 
    });

    // console.log(FK);
};
