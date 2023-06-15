"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataLoader_1 = require("./dataLoader");
const app = (0, express_1.default)();
let data = [];
(0, dataLoader_1.loadData)('../dataset/32100260.csv')
    .then((theData) => {
    data = theData;
    console.log('Successful loading of data');
})
    .catch((error) => {
    console.error('There was an error while loading data: ', error);
});
app.get('/data', (request, response) => {
    response.json(data);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Sever started on  port ${port}'));
