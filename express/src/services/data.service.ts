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
import { request } from 'http';
import { v4 as uuidv4 } from 'uuid';

class DataService {
    private filePath: string;
    private data: CSVData[] = [];

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
        return new Promise((resolve, reject) => {
          file.createReadStream(this.filePath)
            .pipe(csvParser())
            .on('data', (row: CSVData) => {
              // Generate a UUID and assign it to the ID property
              row.ID = uuidv4();
              theData.push(row);
            })
            .on('end', () => {
              console.log('File IO completed successfully!');
              resolve(theData);
            })
            .on('error', (error) => {
              reject(error);
            });
        });
      }


      writeCsvData(data: CSVData[]): Promise<void> {
        return new Promise((resolve, reject) => {  
            const ws = file.createWriteStream(this.filePath);
            fastcsv.write(data, { headers: true }).pipe(ws).on('finish', () => {
                resolve();
            }).on('error', (error) => {
                reject(error);
                }
            );
        });
    }

    saveAsNewFile(data: CSVData[]): Promise<void> {
      const filePathWithSuffix = this.getFilePathWithSuffix();
      
      return new Promise((resolve, reject) => {
        const ws = file.createWriteStream(filePathWithSuffix);
        fastcsv.write(data, { headers: true })
          .pipe(ws)
          .on('finish', resolve)
          .on('error', reject);
      });
    }

    private getFilePathWithSuffix(): string {
        const originalFileName = this.filePath.slice(this.filePath.lastIndexOf('/') + 1);
        const fileExtension = originalFileName.slice(originalFileName.lastIndexOf('.'));
        const filePathWithoutExtension = originalFileName.slice(0, originalFileName.lastIndexOf('.'));

        let suffix = 1;
        let filePathWithSuffix = this.filePath;

        while (file.existsSync(filePathWithSuffix)) {
            suffix++;
            const newFileName = `${filePathWithoutExtension}_${suffix}$fileExtension`;
            filePathWithSuffix = this.filePath.replace(originalFileName, newFileName);
        }
        
        return filePathWithSuffix;
        
      }
}

export default DataService;