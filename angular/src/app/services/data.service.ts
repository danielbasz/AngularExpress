/**
 * 23S CST 8333 360
 * Author: Daniel Barboza
 * id: 041025651
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CSVData } from '../models/CSVData.model';

@Injectable({
  providedIn: 'root'
})

/**
 * This service is responsible for handling all HTTP requests to the Express.js API.
 * It uses the Angular HttpClient to make HTTP requests and returns Observables for the components to subscribe to.
 */
export class DataService {

  // The Express.js API URL
  private apiUrl = 'http://localhost:3000/api/data'; 

  /**
   * Constructor for DataService
   * @param http The Angular HttpClient module to make HTTP requests
   */
  constructor(private http: HttpClient) { }

  /**
   * This method returns an Observable that contains an array of CSVData objects.
   * It makes a GET request to the Express.js API at the /api/data endpoint.
   * @returns An Observable containing an array of CSVData objects
   * @example getAllData().subscribe((data: CSVData[]) => { console.log(data); });
   */
  getAllData(): Observable<CSVData[]> {
    return this.http.get<CSVData[]>(`${this.apiUrl}`);
  }

  /**
   * This method returns an Observable that contains a single CSVData object.
   * It makes a GET request to the Express.js API at the /api/data/:id endpoint.
   * @param id The ID of the CSVData object to retrieve
   * @returns An Observable containing a single CSVData object
   * @example getDataById('123').subscribe((data: CSVData) => { console.log(data); });
   */
  getDataById(id: string): Observable<CSVData> {
    return this.http.get<CSVData>(`${this.apiUrl}/${id}`);
  }

  /**
   * This method returns an Observable that contains a single CSVData object.
   * It makes a POST request to the Express.js API at the /api/data endpoint.
   * @param data The CSVData object to add
   * @returns An Observable containing a single CSVData object
   * @example addData(data).subscribe((data: CSVData) => { console.log(data); });
   */
  addData(data: CSVData): Observable<CSVData> {
    return this.http.post<CSVData>(`${this.apiUrl}`, data);
  }

  /**
   * This method returns an Observable that contains a single CSVData object.
   * It makes a PUT request to the Express.js API at the /api/data/:id endpoint.
   * @param id The ID of the CSVData object to update
   * @param data The CSVData object with updated data
   * @returns An Observable containing a single CSVData object
   * @example updateData('123', data).subscribe((data: CSVData) => { console.log(data); });
   */ 
  updateData(id: string, data: CSVData): Observable<CSVData> {
    return this.http.put<CSVData>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * This method returns an Observable that contains a single CSVData object.
   * It makes a DELETE request to the Express.js API at the /api/data/:id endpoint.
   * @param id The ID of the CSVData object to delete
   * @returns An Observable containing a single CSVData object
   * @example deleteData('123').subscribe((data: CSVData) => { console.log(data); });
   */
  deleteData(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

 
}
