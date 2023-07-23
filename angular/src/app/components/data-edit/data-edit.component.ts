import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CSVData } from 'src/app/models/CSVData.model';

@Component({
  selector: 'app-data-edit',
  templateUrl: './data-edit.component.html',
  styleUrls: ['./data-edit.component.scss']
})
export class DataEditComponent implements OnInit {
  dataForm!: FormGroup;
  dataId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private theDataService: DataService
  ) {
    this.dataForm = new FormGroup({
      
      REF_DATE: new FormControl(''),
      GEO: new FormControl(''),
      
      PRODUCT: new FormControl(''),
      STORAGE: new FormControl(''),
      UOM: new FormControl(''),
      
      VECTOR: new FormControl(''),
      COORDINATE: new FormControl(''),
      VALUE: new FormControl(''),
      
    });
  }

  ngOnInit(): void {
    this.dataId = this.route.snapshot.paramMap.get('id')!;
    this.theDataService.getDataById(this.dataId).subscribe((data: CSVData) => {
      this.createForm(data);
    });
  }

  createForm(data: CSVData): void {
    this.dataForm = new FormGroup({
      
      REF_DATE: new FormControl(data.REF_DATE),
      GEO: new FormControl(data.GEO),
      
      PRODUCT: new FormControl(data.PRODUCT),
      STORAGE: new FormControl(data.STORAGE),
      UOM: new FormControl(data.UOM),
      
      VECTOR: new FormControl(data.VECTOR),
      COORDINATE: new FormControl(data.COORDINATE),
      VALUE: new FormControl(data.VALUE),
     
    });
  }

  onSubmit(): void {
    const dataToBeUpdated = { ...this.dataForm.value, ID: this.dataId };
    
    this.theDataService.updateData(this.dataId, dataToBeUpdated).subscribe(
      response => {
        console.log('Data updated successfully', response);
        this.router.navigate(['']); // Redirect to the data list page after update
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
}
