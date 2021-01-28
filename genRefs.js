const faker = require('faker');
const sequelize = require('sequelize');

exports.genRefs = (number = 50) => {
    const data = [];

    for (let i = 0; i < number; i++) {
        data.push({
            authorId          : faker.random.float(50),
            averageRating     : faker.random.float(50),
            blocked           : faker.random.float(50),
            createdAt         : faker.random.float(50),
            currentVersion    : faker.random.float(50),
            currentVersionId  : faker.random.float(50),
            currentVersionSize: faker.random.float(50),
            deletedAt         : faker.random.float(50),
            description       : faker.random.float(50),
            id                : faker.random.float(50),
            maxRating         : faker.random.float(50),
            meta              : faker.random.float(50),
            minRating         : faker.random.float(50),
            name              : faker.random.float(50),
            private           : faker.random.float(50),
            ratingCount       : faker.random.float(50),
            ratingModifier    : faker.random.float(50),
            subscriberCount   : faker.random.float(50),
            typeName          : faker.random.float(50),
            unlisted          : faker.random.float(50),
            updatedAt         : faker.random.float(50),
        });
    }

    return data;
};

