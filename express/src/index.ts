/**
 * 23S CST 8333 360
 * Author: Daniel Barboza
 * id: 041025651
 */

import express, { Request, response, Response } from "express";
import { request } from "http";
import { CSVData } from "./models/CSVData.models";
import DataService from "../src/services/data.service";
import cors from 'cors';
import { log } from "console";

const DATA_FILE_PATH = '../dataset/32100260.csv';

/**
 * Defines express as the framework of our app and adds 'cors' for easing different
 * port communication between our front end and back end
 */
const app = express();
app.use(cors());
app.use(express.json());



/**
 * initialization of our data objects
 */ 
const theDataService = new DataService(DATA_FILE_PATH);
let data: CSVData[] = [];

theDataService.loadData().then((theData: CSVData[]) => {
    data = theData;
})
.catch((error: any) => {
    console.error('Error Handling data: ', error);
});

   
/**
 * Handles the '/data' endpoint for our server and sends said 'data' as a JSON response
 *
 * @param request The incoming request.
 * @param response The outgoing response.
 */
app.get('/data', (request: Request, response: Response) => {
    theDataService.loadData()
    .then((theData: CSVData[]) => {
        data = theData;
        response.json(data);
    })
    .catch((error: any) => {
        console.error('Error loading', error);
        response.status(500).json({error: 'Failed to load'});
    });
    ;
});

app.post('/data', (request: Request, response: Response) => {
    console.log(request.body);
    const newData: CSVData = request.body;

    data.push(newData);
    response.status(201).json({message: 'New record added'});
});

app.post('/data/save', (request: Request, response: Response) => {
    theDataService.writeCsvData(data)
      .then(() => {
        response.status(200).json({ message: 'Data saved successfully' });
      })
      .catch((error: any) => {
        console.error('Error saving data:', error);
        response.status(500).json({ error: 'Failed to save data' });
      });
  });
  





/**
 * Opens server listening on port 3000
 */
app.listen(3000, () => console.log('Sever started on port 3000'));

