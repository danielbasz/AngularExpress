
import express, { Request, Response } from 'express';
import { getData, theDataService } from '../modules/data.module';
import { CSVData } from '../models/CSVData.models';

const router = express.Router();

// get all data endpoint
router.get('/data', (request: Request, response: Response) => {
    theDataService.loadData()
    .then((theData: CSVData[]) => {
        const data = getData();
        response.json(data);
    })
    .catch((error: any) => {
        console.error('Error loading', error);
        response.status(500).json({error: 'Failed to load'});
    });
    ;
});

// create new data row end point
router.post('/data', (request: Request, response: Response) => {
    console.log(request.body);
    const newData: CSVData = request.body;
    const data = getData();
    data.push(newData);
    response.status(201).json({message: 'New record added'});
});

// write to file end point
router.post('/data/save', (request: Request, response: Response) => {
    const data = getData();
    theDataService.writeCsvData(data)
      .then(() => {
        response.status(200).json({ message: 'Data saved successfully' });
      })
      .catch((error: any) => {
        console.error('Error saving data:', error);
        response.status(500).json({ error: 'Failed to save data' });
      });
  });

export default router;
