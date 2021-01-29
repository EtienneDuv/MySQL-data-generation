const faker = require('faker');
faker.seed(1);

const REPORT_TYPES = [
    'spam',
    'inappropriate-content',
    'offensive-language',
    'misleading',
    'other',
];

exports.DATA = {
    uuid        : faker.random.uuid,
    varchar     : (n) => faker.lorem.words(50).slice(0, n),
    int         : faker.random.number,
    json        : '{}',
    datetime    : faker.date.past,
    text        : faker.lorem.text,
    rating      : () => faker.random.float(5),
    version     : () => faker.random.number(2) +'.'+ faker.random.number(15) +'.'+ faker.random.number(30),
    url         : faker.image.imageUrl,
    reportType  : () => faker.random.arrayElement(REPORT_TYPES),
    arrayElement: (arr) => faker.random.arrayElement(arr),
    boolean     : faker.random.boolean,
    md5         : () => {
        let str = '';
        while (str.length < 32) {
            str = str.concat(Math.random().toString(36).substring(2));
        }
        return str.substring(0, 32);
    },
};
