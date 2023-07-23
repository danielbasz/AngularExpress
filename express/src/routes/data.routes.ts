import express, { Request, Response } from 'express';
import { MongoClient, Db, MongoError, ObjectId } from 'mongodb';
import { CSVData } from '../models/CSVData.models';
import fs from 'fs';

/**
 * Base data routes start with /api/data
 */
const app = express();
const uri = 'mongodb://localhost:27017';
let db: Db;

const client = new MongoClient(uri);
let originalData: CSVData[];

/**
 * Connects to the database
 */
client.connect()
    .then(() => {
        console.log("Connected successfully to server");
        db = client.db('CST8333');  // database name
    })
    .catch(err => {
        console.error('Failed to connect', err);
        process.exit(1);
    });


const router = express.Router();



/**
 * Get all data endpoint
 */
router.get('/data', async(request: Request, response: Response) => {
  const data = await db.collection('frozenVegetables').find().toArray();
    response.status(200).json(data)
   });



/**
 * Add data endpoint
 */
router.post('/data', async (req: Request, res: Response) => {
    console.log(req.body);
    const newItem = req.body; // get the data sent in the POST request
    try {
        const result = await db.collection('frozenVegetables').insertOne(newItem);
        newItem._id = result.insertedId; // Add the inserted ID to the new item
        res.json(newItem); // return the inserted item
    } catch(err) {
        console.error('An error occurred while inserting new item', err);
        res.status(500).json({ error: 'An error occurred while inserting new item' });
    }
  });


// // Save data as a new file endpoint
// router.get('/data/saveAsNewFile', async (req: Request, res: Response) => {
//   try {
//       const data = await db.collection('frozenVegetables').find().toArray();
//       fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
//       res.status(200).send("Data has been written to file successfully");
//   } catch(err) {
//       console.error('An error occurred while writing data to new file', err);
//       res.status(500).json({ error: 'An error occurred while writing data to new file' });
//   }
// });


/**
 * Get data by id endpoint
 */
router.get('/data/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
      const item = await db.collection('frozenVegetables').findOne({ _id: new ObjectId(id) });
      if (item) {
          res.json(item); // return the found item
      } else {
          res.status(404).send(`No item found with id: ${id}`);
      }
  } catch(err) {
      console.error('An error occurred while finding the item', err);
      res.status(500).json({ error: 'An error occurred while finding the item' });
  }
});


/**
 * Update data by id endpoint
 */
router.put('/data/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const newData = req.body; // get the new data sent in the PUT request

  try {
      const result = await db.collection('frozenVegetables').updateOne({ _id: new ObjectId(id) }, { $set: newData });

      if (result.matchedCount > 0) {
          // the item was found and updated
          res.json(await db.collection('frozenVegetables').findOne({ _id: new ObjectId(id) })); // return the updated item
      } else {
          // the item was not found
          res.status(404).send(`No item found with id: ${id}`);
      }
  } catch(err) {
      console.error('An error occurred while updating the item', err);
      res.status(500).json({ error: 'An error occurred while updating the item' });
  }
});



/**
 * Delete data by id endpoint
 */
router.delete('/data/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
      const result = await db.collection('frozenVegetables').deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
          res.status(200).send(`Item with id: ${id} was successfully deleted`);
      } else {
          res.status(404).send(`No item found with id: ${id}`);
      }
  } catch(err) {
      console.error('An error occurred while deleting the item', err);
      res.status(500).json({ error: 'An error occurred while deleting the item' });
  }
});


export default router;
