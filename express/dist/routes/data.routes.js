"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_module_1 = require("../modules/data.module");
const router = express_1.default.Router();
// get all data endpoint
router.get('/data', (request, response) => {
    data_module_1.theDataService.loadData()
        .then((theData) => {
        const data = theData;
        response.json(data);
    })
        .catch((error) => {
        console.error('Error loading', error);
        response.status(500).json({ error: 'Failed to load' });
    });
    ;
});
/**
 * Add new row of data endpoint
 */
router.post('/data', (request, response) => {
    console.log(request.body);
    const newData = request.body;
    const data = (0, data_module_1.getData)();
    const maxId = Math.max(...data.map((item) => item.ID));
    newData.ID = maxId + 1;
    data.push(newData);
    response.status(201).json({ message: 'New record added' });
});
/**
 * Save data endpoint
 */
router.post('/data/save', (request, response) => {
    const data = (0, data_module_1.getData)();
    data_module_1.theDataService.writeCsvData(data)
        .then(() => {
        response.status(200).json({ message: 'Data saved successfully' });
    })
        .catch((error) => {
        console.error('Error saving data:', error);
        response.status(500).json({ error: 'Failed to save data' });
    });
});
/**
 * Edit data by id endpoint
 */
router.put('/data/:id', (request, response) => {
    // what is the id?
    const id = request.params.id;
    //gets dats from csv file
    const data = (0, data_module_1.getData)();
    //gets new data from request body, as in what we want to update
    const newData = request.body;
    //finds index of data we want to update in the csv file
    const index = data.findIndex((theData) => theData.ID === +id);
    //if index is found, update data
    if (index !== -1) {
        data[index] = newData;
        response.status(200).json({ message: 'Data updated succesfully' });
    }
    else {
        response.status(404).json({ message: 'Data not found' });
    }
});
/**
 * Delete data endpoint
 */
router.delete('/data/:id', (request, response) => {
    // what is the id?
    const id = request.params.id;
    //gets data from csv file
    const data = (0, data_module_1.getData)();
    //finds index of data we want to delete in the csv file
    const index = data.findIndex((theData) => theData.ID === +id);
    //if index is found, delete data
    if (index !== -1) {
        data.splice(index, 1);
        response.status(200).json({ message: 'Data deleted successfully' });
    }
    else {
        response.status(404).json({ message: 'Data not found' });
    }
});
exports.default = router;
