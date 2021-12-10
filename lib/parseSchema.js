exports.parseSchema = (schema) => {
    const cleanedSchema = {};
    const cleanedSchemaTables = [];
    let i = 0;
    let batch = [];
    let laterBatch = [];
    
    // TOP LEVEL TABLES (REFERENTIAL)
    schema.map(el => {
        // if (el.name === 'assetReports') console.log(el);
        el['foreignKeys']
            ? laterBatch.push(el)
            : (batch.push(el), cleanedSchemaTables.push(el.name));
    });
    cleanedSchema[`batch${i}`] = batch;

    // OTHERS
    while(laterBatch.length > 0) {
        i++;
        const currentBatch = laterBatch;
        const currentCleanedSchemaTables = [...cleanedSchemaTables];
        laterBatch = [];
        batch = [];

        currentBatch.map(el => {
            const fkArray = el.foreignKeys.map(fk => fk.reference.table);
            const checker = fkArray.every(fk => currentCleanedSchemaTables.includes(fk));

            checker ? (batch.push(el), cleanedSchemaTables.push(el.name))
                : laterBatch.push(el);
        });

        cleanedSchema[`batch${i}`] = batch;

        if(i>=10) {
            console.log('/!\\ PROBLEM'); 
            console.log(laterBatch);
            break;
        }
    }

    return cleanedSchema;
};
