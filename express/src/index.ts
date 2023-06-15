/**
 * 23S CST 8333 360
 * Author: Daniel Barboza
 * id: 041025651
 */

import express, { Request, response, Response } from "express";
import { request } from "http";
import { loadData, CSVData } from "./dataLoader";
import cors from 'cors';

/**
 * Defines express as the framework of our app and adds 'cors' for easing different
 * port communication between our front end and back end
 */
const app = express();
app.use(cors());

/**
 * initialization of our data object
 */ 
let data: CSVData[] = [];

/**
 * Loads data from a CSV file and stores it in the 'data' variable.
 * If an error occurs during loading, it is caught and logged to the console.
 * by Daniel Barboza
 */
loadData('../dataset/32100260.csv')
    .then((theData) => {
        data = theData;
        console.log('Successful loading of data');
    })
    .catch((error) => {
        console.error('There was an error while loading data: ', error);
    });
   
/**
 * Handles the '/data' endpoint for our server and sends said 'data' as a JSON response
 *
 * @param request The incoming request.
 * @param response The outgoing response.
 */
app.get('/data', (request: Request, response: Response) => {
    response.json(data);
});

/**
 * Opens server listening on port 3000
 */
app.listen(3000, () => console.log('Sever started on port 3000'));

