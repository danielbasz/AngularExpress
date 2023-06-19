import { inject, Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CSVData } from '../models/CSVData.model';
import { catchError, switchMap } from 'rxjs/operators';
import { CsvParser } from 'csv-parser';
import { Readable } from 'stream';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:3000/api/data';
  private filePath = '../dataset/32100260.csv';


  constructor(private http: HttpClient) { }

  //get all data
  getData(): Observable<CSVData[]> {
    return this.http.get<CSVData[]>(this.url);
  }

  reloadData(): Observable<CSVData[]> {
    return this.http.get<CSVData[]>(`${this.url}/reloadData`);
  }

  saveData(data: CSVData[]): Observable<CSVData[]> {
    return this.http.post<CSVData[]>(`${this.url}/save`, data).pipe(
      catchError((error: any) => {
        console.error('Error saving data:', error);
        throw new Error('Failed to save data');
      })
    );
  }

  parseCSVData(csvData: string): CSVData[] {
    const parsedData: CSVData[] = [];
  
    // Split the CSV data into rows
    const rows = csvData.split('\n');
  
    // Extract the headers from the first row
    const headers = rows[0].split(',');
  
    // Process each row of data (starting from the second row)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(',');
  
      // Create a new CSVData object and assign values from the row
      const csvData: CSVData = {
        ID: row[0],
        REF_DATE: row[1],
        GEO: row[2],
        DGUID: row[3],
        PRODUCT: row[4],
        STORAGE: row[5],
        UOM: row[6],
        UOM_ID: row[7],
        SCALAR_FACTOR: row[8],
        SCALAR_ID: row[9],
        VECTOR: row[10],
        COORDINATE: row[11],
        VALUE: row[12],
        STATUS: row[13],
        SYMBOL: row[14],
        TERMINATED: row[15],
        DECIMALS: row[16],
      };
  
      parsedData.push(csvData);
    }
  
    return parsedData;
  }
  

  saveAsNewFile(data: CSVData[]): Observable<any> {
    return this.http.post<any>(`${this.url}/saveAsNewFile`, data).pipe(
      catchError((error) => {
        console.error('Error saving data:', error);
        throw new Error('Failed to save data');
      })
    );
  }
  


  //get data by id
  getDataById(ID: string): Observable<CSVData> {
    return this.http.get<CSVData>(`${this.url}/${ID}`);
  }

  //create data
  createData(data: CSVData): Observable<CSVData> {
    return this.http.post<CSVData>(this.url, data);
  }

  //update data
  updateData(data: CSVData): Observable<CSVData> {
    return this.http.put<CSVData>(`${this.url}/${data.ID}`, data);
  }

  //delete data
  deleteData(id: string): Observable<CSVData> {
    return this.http.delete<CSVData>(`${this.url}/${id}`);
  }

}
