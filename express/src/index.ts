/**
 * 23S CST 8333 360
 * Author: Daniel Barboza
 * id: 041025651
 */

import express, { Request, response, Response } from "express";
import { request } from "http";
import { CSVData } from "./models/CSVData.models";
import cors from 'cors';
import { log } from "console";
import dataRoutes from './routes/data.routes';

const DATA_FILE_PATH = '../dataset/32100260.csv';
/**
 * Defines express as the framework of our app and adds 'cors' for easing different
 * port communication between our front end and back end
 */
const app = express();
app.use(cors());
app.use(express.json());
   
// our routes
app.use('/api', dataRoutes);

/**
 * Opens server listening on port 3000
 */
app.listen(3000, () => console.log('Sever started on port 3000'));

