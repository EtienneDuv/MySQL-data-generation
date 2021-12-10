exports.generateSql = (schema) => {
    let queries = '';
    Object.keys(schema).forEach((batch, i) => {
        queries += `# ===== BATCH ${i} ===================`;
        queries += ('\n# ' + '==========='.repeat(3)).repeat(2) + '\n\n';

        schema[batch].map(table => {
            let queryString = '';
            queryString += `INSERT IGNORE INTO ${table.name} (${table.columnsArray}) VALUES`;

            table.data.forEach((row, index) => {
                let rowArray = row.map(el => {
                    // if (table.name === 'assets') console.log(typeof el, el)
                    if (typeof el === 'object') return JSON.stringify(el)
                    return `"${el}"`
                });
                
                rowArray = rowArray.map(el => {
                    // if (table.name === 'assets') console.log(el[0])
                    if (el[0] !== '"') return `'${el}'`
                    return el
                })

                let rowString = '\n(' + rowArray.toString() + ')';
                rowString = rowString.replace(/"null"/g, null);

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
