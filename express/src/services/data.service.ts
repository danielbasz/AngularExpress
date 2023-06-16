/**
 * 23S CST 8333 360
 * Author: Daniel Barboza
 * id: 041025651
 */

import * as file from 'fs';
import csvParser from 'csv-parser';
import { resolve } from 'path';
import { rejects } from 'assert';
import { CSVData } from '../models/CSVData.models';
import * as fastcsv from 'fast-csv';


class DataService {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    /**
    * loadData initializes a CSVData empty array so that we can create a readstream
    * using our file system to de facto read our CSV data. Here we use the csv parser
    * from the csv-parser library also to facilitate this transaction and individually push
    * each row to our theData empty list that is waiting for the actual data.
    * @param path string that contains the path to our csv file
    * @returns a Promise object that, if the data is succesfully read, will resolve the transaction and will return the data,
    * and if it encounters an error, rejects the transaction.
    * by Daniel Barboza
    */
    loadData(): Promise<CSVData[]> {
        const theData: CSVData[] = [];
        return new Promise((resolve,reject) => {
          file.createReadStream(this.filePath).pipe(csvParser()).on('data', (row: CSVData) => {
             theData.push(row);
            })
            .on('end', () => {
                console.log('File IO completed successfully!');
                resolve(theData);
            })
            .on('error', (error) => {
                reject(error);
            });
        })
    }

    writeCsvData(data: CSVData[]): Promise<CSVData[]> {
        return new Promise((resolve, reject) => {
            const ws = file.createWriteStream(this.filePath);
            fastcsv.write(data, {headers: true})
            .pipe(ws)
            .on('finish', resolve)
            .on('error', reject)
        });
    }
}

export default DataService;