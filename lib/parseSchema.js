exports.parseSchema = (schema) => {
    const cleanedSchema = {};
    const cleanedSchemaTables = [];
    let i = 1;
    let batch = [];
    let laterBatch = [];
    
    // REFS
    schema.map(el => {
        el['foreignKeys']
            ? laterBatch.push(el)
            : (batch.push(el), cleanedSchemaTables.push(el.name));
    });
    cleanedSchema[`batch${i}`] = batch;

    // OTHERS
    while(laterBatch.length > 0) {
        i++;
        const currentBatch = laterBatch;
        laterBatch = [];
        batch = [];

        currentBatch.map(el => {
            el.foreignKeys.map(fk => {
                cleanedSchemaTables.includes(fk.reference.table) 
                    ? (batch.push(el), cleanedSchemaTables.push(el.name))
                    : laterBatch.push(el);

            });
        });

        cleanedSchema[`batch${i}`] = batch;

        if(i>=10) {
            console.log('/!\\ PROBLEM'); 
            break;
        }
    }
    
    return cleanedSchema;
};
