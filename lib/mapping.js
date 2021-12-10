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
    uuid           : faker.datatype.uuid,
    varchar        : (n) => faker.lorem.words(50).slice(0, n),
    int            : faker.datatype.number,
    json           : '{}',
    datetime       : faker.date.past,
    rating         : () => `0.${faker.datatype.number(9)}`,
    version        : () => faker.datatype.number(2) +'.'+ faker.datatype.number(15) +'.'+ faker.datatype.number(30),
    url            : faker.image.imageUrl,
    reportType     : () => faker.random.arrayElement(REPORT_TYPES),
    elementOfArray : (arr) => faker.random.arrayElement(arr),
    boolean        : faker.datatype.boolean,
    tagCategoryName: () => 'category-' + faker.datatype.number(10_000),
    oneOf          : (array) => faker.random.arrayElement(array),
    md5            : () => {
        let str = '';
        while (str.length < 32) {
            str = str.concat(Math.random().toString(36).substring(2));
        }
        return str.substring(0, 32);
    },
};
