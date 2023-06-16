import { Component, OnInit } from '@angular/core';
import { CSVData } from '../app/models/CSVData';
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
  }


  fetch() {
    this.theDataService.getData().subscribe(
      data => this.data = data,
      error => console.error(error)  
    );
  }
}
