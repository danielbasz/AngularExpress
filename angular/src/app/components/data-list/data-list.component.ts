import { Component, OnInit } from '@angular/core';
import { CSVData } from 'src/app/models/CSVData.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { response } from 'express';
import * as csvParser from 'csv-parser';
import { parse } from 'path';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  data: CSVData[] = [];
  constructor(private theDataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.theDataService.getAllData().subscribe((data: CSVData[]) => {
      this.data = data;
      
    });
  }

  detailData(id: string) {
    this.router.navigate([`detail/${id}`]);
  }


}




