exports.generateSql = (schema) => {
    let queries = '';
    Object.keys(schema).forEach(batch => {
        schema[batch].map(table => {
            let queryString = '';

            queryString += `INSERT INTO ${table.name} (${table.columnsArray}) VALUES`;

            table.data.forEach((row, index) => {

                let rowArray = row.map(el => `"${el}"`);
                
                let rowString = `\n(${rowArray.toString()})`;

                rowString = rowString.replace(/"null"/, null);

                index !== table.data.length-1
                    ? rowString += ','
                    : rowString += ';';

                queryString += rowString;
            });

            queries += queryString + '\n\n';
        }); 
    });

    return queries;
};