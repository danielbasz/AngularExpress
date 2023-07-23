import { Component, OnInit } from '@angular/core';
import { CSVData } from 'src/app/models/CSVData.model';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.scss']
})
export class DataDetailComponent implements OnInit{

  constructor(private route: ActivatedRoute, private theDataService: DataService, private router: Router) { }
  
deleteData(id: string) {
this.theDataService.deleteData(id).subscribe(() => {
  // Handle the successful delete operation
  this.router.navigate(['/']);
}, (error: any) => {
  // Handle the error
  console.error(error);
}
);
}

  data!: CSVData;
  dataId!: string;

  

  ngOnInit(): void {
    this.dataId = this.route.snapshot.paramMap.get('_id')!;
    this.theDataService.getDataById(this.dataId).subscribe((data: CSVData) => {
      this.data = data;
    });
  }
}
