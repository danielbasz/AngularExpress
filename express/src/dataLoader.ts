/**
 * 23S CST 8333 360
 * Author: Daniel Barboza
 * id: 041025651
 */

import * as file from 'fs';
import csvParser from 'csv-parser';
import { resolve } from 'path';
import { rejects } from 'assert';

/**
 * Makes a blueprint of our data for our server to load data. This is our entity
 */
export interface CSVData {
    REF_DATE: string;
    GEO: string;
    DGUID: string;
    'Type of product': string;
    'Type of storage': string;	
    UOM: string;
    UOM_ID: string;
    SCALAR_FACTOR: string;
    SCALAR_ID: number;
    VECTOR: string;
    COORDINATE: string;
    VALUE: number;
    STATUS: string;
    SYMBOL: string;
    TERMINATED: string;
    DECIMALS: number;
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
export function loadData(path: string): Promise<CSVData[]> {
    const theData: CSVData[] = [];
    return new Promise((resolve,reject) => {
        file.createReadStream(path).pipe(csvParser()).on('data', (row: CSVData) => {
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