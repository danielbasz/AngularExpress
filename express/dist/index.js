"use strict";
/**
 * 23S CST 8333 360
 * Author: Daniel Barboza
 * id: 041025651
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_service_1 = __importDefault(require("../src/services/data.service"));
const cors_1 = __importDefault(require("cors"));
const DATA_FILE_PATH = '../dataset/32100260.csv';
/**
 * Defines express as the framework of our app and adds 'cors' for easing different
 * port communication between our front end and back end
 */
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/**
 * initialization of our data objects
 */
const theDataService = new data_service_1.default(DATA_FILE_PATH);
let data = [];
theDataService.loadData().then((theData) => {
    data = theData;
})
    .catch((error) => {
    console.error('Error Handling data: ', error);
});
/**
 * Handles the '/data' endpoint for our server and sends said 'data' as a JSON response
 *
 * @param request The incoming request.
 * @param response The outgoing response.
 */
app.get('/data', (request, response) => {
    theDataService.loadData()
        .then((theData) => {
        data = theData;
        response.json(data);
    })
        .catch((error) => {
        console.error('Error loading', error);
        response.status(500).json({ error: 'Failed to load' });
    });
    ;
});
app.post('/data', (request, response) => {
    console.log(request.body);
    const newData = request.body;
    data.push(newData);
    response.status(201).json({ message: 'New record added' });
});
/**
 * Opens server listening on port 3000
 */
app.listen(3000, () => console.log('Sever started on port 3000'));
