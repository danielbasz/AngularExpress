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


  data!: CSVData;
  dataId!: string;

  constructor(private route: ActivatedRoute, private theDataService: DataService, private router: Router) { }
  


deleteData(id: string) {
this.theDataService.deleteData(id).subscribe(() => {
  // Handle the successful delete operation
  console.log('Data deleted');
  this.router.navigate(['']);
}, (error: any) => {
  // Handle the error
  console.error(error);
}
);
}

 
  

  ngOnInit(): void {
    this.dataId = this.route.snapshot.paramMap.get('id')!;
    this.theDataService.getDataById(this.dataId).subscribe((data: CSVData) => {
      this.data = data;
    });
  }
}
