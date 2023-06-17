
import express, { Request, Response } from 'express';
import { getData, theDataService } from '../modules/data.module';
import { CSVData } from '../models/CSVData.models';

const router = express.Router();

// get all data endpoint
router.get('/data', (request: Request, response: Response) => {
    theDataService.loadData()
    .then((theData: CSVData[]) => {
        const data = theData;
        response.json(data);
    })
    .catch((error: any) => {
        console.error('Error loading', error);
        response.status(500).json({error: 'Failed to load'});
    });
    ;
});

/**
 * Add new row of data endpoint
 */
router.post('/data', (request: Request, response: Response) => {
    console.log(request.body);
    const newData: CSVData = request.body;
    const data = getData();
    data.push(newData);
    response.status(201).json({message: 'New record added'});
});

/**
 * Save data endpoint
 */
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

/**
 * Edit data by id endpoint
 */
router.put('/data/:id', (request: Request, response: Response) => {
  // what is the id?
  const id = request.params.id;
  
  //gets dats from csv file
  const data = getData();

  //gets new data from request body, as in what we want to update
  const newData: CSVData = request.body;
  
  //finds index of data we want to update in the csv file
  const index = data.findIndex((theData:CSVData) => theData.ID === +id);

  //if index is found, update data
  if (index !== -1) {
    data[index] = newData;
    response.status(200).json({ message: 'Data updated succesfully' });
  } else {
    response.status(404).json({ message: 'Data not found' });
  }
});

/**
 * Delete data endpoint
 */
router.delete('/data/:id', (request: Request, response: Response) => {
  // what is the id?
  const id = request.params.id;

  //gets data from csv file
  const data = getData();

  //finds index of data we want to delete in the csv file
  const index = data.findIndex((theData:CSVData) => theData.ID === +id);

  //if index is found, delete data
  if (index !== -1) {
    data.splice(index, 1);
    response.status(200).json({ message: 'Data deleted successfully' });
  } else {
    response.status(404).json({ message: 'Data not found' });
  }
});

export default router;
