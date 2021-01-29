const faker = require('faker');
faker.seed(1);

exports.randInt = (max) => Math.floor(Math.random() * Math.floor(max));
const randomFloat = (max) => Math.floor(Math.random() * Math.floor(max));

const REPORT_TYPES = [
    'spam',
    'inappropriate-content',
    'offensive-language',
    'misleading',
    'other',
];

exports.DELETE_PROPERTIES = [
    'primaryKey', 
    'uniqueKeys', 
    'options', 
    'foreignKeys', 
    'indexes', 
    'fkList',
];

exports.DATA = {
    uuid        : faker.random.uuid,
    varchar     : (n) => faker.lorem.words(50).slice(0, n),
    int         : faker.random.number,
    json        : {},
    datetime    : faker.date.past,
    text        : faker.lorem.text,
    rating      : randomFloat,
    version     : () => this.randInt(2) +'.'+ this.randInt(15) +'.'+ this.randInt(30),
    url         : faker.image.imageUrl,
    reportType  : () => faker.random.arrayElement(REPORT_TYPES),
    arrayElement: (arr) => faker.random.arrayElement(arr),
    md5         : () => {
        let str = '';
        while (str.length < 32) {
            str = str.concat(Math.random().toString(36).substring(2));
        }
        return str.substring(0, 32);
    },
};
