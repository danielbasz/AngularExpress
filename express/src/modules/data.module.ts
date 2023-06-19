// Purpose: Data module to handle data from CSV file
//imports contain models and services
import { CSVData } from '../models/CSVData.models';
import DataService from '../services/data.service';
import { v4 as uuidv4 } from 'uuid';


/**
 * DATA_FILE_PATH is a constant that contains the path to our CSV file
 */
const DATA_FILE_PATH = '../dataset/32100260.csv';

class DataModule {
  private data: CSVData[];
  private dataService: DataService;
  private filePath: string;


  constructor() {
    this.dataService = new DataService(DATA_FILE_PATH);
    this.data = [];
    this.filePath = '';
    this.loadData();
  }



//loads 100 rows data from CSV file when module is loaded. As this is the first run of load,
// we can limit the reads to 100 rows.
// Load the data when the module is initialized

loadData(): void {
  this.dataService.loadData()
    .then((loadedData: CSVData[]) => {
      // Generate unique IDs for each data object
      this.data = loadedData.map((item) => ({
        ...item,
        ID: uuidv4(),
      }));
    })
    .catch((error: any) => {
      console.error('Error handling data:', error);
    });
}

//by daniel barboza
getData(): CSVData[] {
  return this.data;
}

setData(data: CSVData[]): boolean {
  this.data = data;
  return true;
}

saveData(data: CSVData[]): Promise<void> {
  return this.dataService.writeCsvData(this.data);
}

saveToNewFile(): Promise<void> {
  return this.dataService.saveAsNewFile(this.data);

  }
}


const dataModule = new DataModule();

export function getData(): CSVData[] {
return dataModule.getData();
}

export function setData(data: CSVData[]): boolean {
return dataModule.setData(data);
}

export function saveData(data: CSVData[]): Promise<void> {
return dataModule.saveData(data);
}

export function saveNewData(data: CSVData[]): Promise<void> {
return dataModule.saveToNewFile();
}

export default dataModule;


