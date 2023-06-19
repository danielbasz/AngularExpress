import { Component, OnInit } from '@angular/core';
import { CSVData } from 'src/app/models/CSVData.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-reload',
  templateUrl: './reload-list.component.html',
  styleUrls: ['./reload-list.component.scss']
})
export class ReloadListComponent implements OnInit {

  data: CSVData[] = [];
  constructor(private theDataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.theDataService.reloadData().subscribe((data: CSVData[]) => {
      this.data = data;
    });
  }

  detailData(id: string) {
    this.router.navigate([`detail/${id}`]);
  }
}
