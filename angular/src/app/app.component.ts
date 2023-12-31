import { Component, OnInit } from '@angular/core';
import { CSVData } from './models/CSVData.model';
import { DataService } from '../app/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'projectOne';
  data: CSVData[] = [];

  constructor(private theDataService: DataService) { }

  ngOnInit(): void {
    this.fetch();
    console.log(this.data)
  }


  fetch() {
    this.theDataService.getAllData().subscribe(
      data => this.data = data,
      error => console.error(error)  
    );
  }
}
