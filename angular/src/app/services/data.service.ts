import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CSVData } from '../models/CSVData.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/api/data'; // replace with the actual base URL of your Express.js API

  constructor(private http: HttpClient) { }

  getAllData(): Observable<CSVData[]> {
    return this.http.get<CSVData[]>(`${this.apiUrl}`);
  }

  getDataById(id: string): Observable<CSVData> {
    return this.http.get<CSVData>(`${this.apiUrl}/${id}`);
  }

  addData(data: CSVData): Observable<CSVData> {
    return this.http.post<CSVData>(`${this.apiUrl}`, data);
  }

  updateData(id: string, data: CSVData): Observable<CSVData> {
    return this.http.put<CSVData>(`${this.apiUrl}/${id}`, data);
  }

  deleteData(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

 
}
