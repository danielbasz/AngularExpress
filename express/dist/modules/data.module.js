"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.theDataService = exports.getData = void 0;
const data_service_1 = __importDefault(require("../services/data.service"));
/**
 * DATA_FILE_PATH is a constant that contains the path to our CSV file
 */
const DATA_FILE_PATH = '../dataset/32100260.csv';
/**
 * theDataService is an instance of our DataService class that will be used to load our data
 */
const theDataService = new data_service_1.default(DATA_FILE_PATH);
exports.theDataService = theDataService;
/**
 * data is an empty array that will be used to store our data from our CSV file
 */
let data = [];
//loads 100 rows data from CSV file when module is loaded. As this is the first run of load,
// we can limit the reads to 100 rows.
// Load the data when the module is initialized
theDataService.loadData().then((theData) => {
    data = theData.slice(0, 100).map((item, index) => {
        var _a;
        return { ...item, ID: (_a = item.ID) !== null && _a !== void 0 ? _a : index + 1 };
    });
})
    .catch((error) => {
    console.error('Error Handling data: ', error);
});
/**
 * getData() is a function that will return our data array
 * @returns data
 */
function getData() {
    return data;
}
exports.getData = getData;
