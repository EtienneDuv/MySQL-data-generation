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
    tagCategoryName: () => 'category-' + faker.random.number(10_000),
        let str = '';
        while (str.length < 32) {
            str = str.concat(Math.random().toString(36).substring(2));
        }
        return str.substring(0, 32);
    },
};
