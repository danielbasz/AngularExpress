// data.module.ts

import { CSVData } from '../models/CSVData.models';
import DataService from '../services/data.service';

const DATA_FILE_PATH = '../dataset/32100260.csv';
const theDataService = new DataService(DATA_FILE_PATH);
let data: CSVData[] = [];

theDataService.loadData().then((theData: CSVData[]) => {
    data = theData;
})
.catch((error: any) => {
    console.error('Error Handling data: ', error);
});

export function getData() {
    return data;
}

export { theDataService };
