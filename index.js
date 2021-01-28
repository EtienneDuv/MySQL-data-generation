const faker = require('faker');
const sequelize = require('sequelize');

const {genRefs} = require('./genRefs');

console.log(genRefs(5));