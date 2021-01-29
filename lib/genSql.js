exports.generateSql = (schema) => {
    let queries = '';
    Object.keys(schema).forEach(batch => {
        schema[batch].map(table => {
            let queryString = '';

            queryString += `INSERT INTO ${table.name} (${table.columnsArray}) VALUES`;

            table.data.forEach((row, index) => {

                let rowString = row.map(el => {
                    if (el === 'null') return null;
                    return `"${el}"`;
                });

                rowString = `\n(${rowString.toString()})`;

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
