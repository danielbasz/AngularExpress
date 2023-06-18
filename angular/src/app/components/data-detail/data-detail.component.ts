import { Component, OnInit } from '@angular/core';
import { CSVData } from 'src/app/models/CSVData.model';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.scss']
})
export class DataDetailComponent implements OnInit{

  data!: CSVData;
  dataId!: string;

  constructor(private route: ActivatedRoute, private theDataService: DataService) { }

  ngOnInit(): void {
    this.dataId = this.route.snapshot.paramMap.get('id')!;
    this.theDataService.getDataById(this.dataId).subscribe((data: CSVData) => {
      this.data = data;
    });
  }
}
