import { Component, OnInit } from '@angular/core';
import { CSVData } from 'src/app/models/CSVData.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  data: CSVData[] = [];
  constructor(private theDataService: DataService) { }

  ngOnInit(): void {
    this.theDataService.getData().subscribe((data: CSVData[]) => {
      this.data = data;
    }
    );
  }
}
