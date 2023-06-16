"use strict";
/**
 * 23S CST 8333 360
 * Author: Daniel Barboza
 * id: 041025651
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file = __importStar(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fastcsv = __importStar(require("fast-csv"));
class DataService {
    constructor(filePath) {
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
    loadData() {
        const theData = [];
        return new Promise((resolve, reject) => {
            file.createReadStream(this.filePath).pipe((0, csv_parser_1.default)()).on('data', (row) => {
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
    writeCsvData(data) {
        return new Promise((resolve, reject) => {
            const ws = file.createWriteStream(this.filePath);
            fastcsv.write(data, { headers: true })
                .pipe(ws)
                .on('finish', resolve)
                .on('error', reject);
        });
    }
}
exports.default = DataService;
