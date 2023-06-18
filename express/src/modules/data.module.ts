// Purpose: Data module to handle data from CSV file
//imports contain models and services
import { CSVData } from '../models/CSVData.models';
import DataService from '../services/data.service';
const { v4: uuidv4 } = require('uuid');


/**
 * DATA_FILE_PATH is a constant that contains the path to our CSV file
 */
const DATA_FILE_PATH = '../dataset/32100260.csv';

/**
 * theDataService is an instance of our DataService class that will be used to load our data
 */
const theDataService = new DataService(DATA_FILE_PATH);

/**
 * data is an empty array that will be used to store our data from our CSV file
 */
let theData: CSVData[] = [];

//loads 100 rows data from CSV file when module is loaded. As this is the first run of load,
// we can limit the reads to 100 rows.
// Load the data when the module is initialized

theDataService.loadData().then((theData: CSVData[]) => {
  const data = theData.slice(0, 100).map((item) => {
    return { ...item, ID: uuidv4() };
  });
  setData(data) ; // Store the loaded data in your module or service
})
.catch((error: any) => {
  console.error('Error Handling data: ', error);
});

export function setData(data: CSVData[]): void {
  theData = data;
}



/**
 * getData() is a function that will return our data array
 * @returns data
 */
export function getData(): CSVData[] {
    return theData;
}

export { theDataService };
