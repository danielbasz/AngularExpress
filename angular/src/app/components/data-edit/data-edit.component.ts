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
      ID: new FormControl(''),
      REF_DATE: new FormControl(''),
      GEO: new FormControl(''),
      DGUID: new FormControl(''),
      PRODUCT: new FormControl(''),
      STORAGE: new FormControl(''),
      UOM: new FormControl(''),
      UOM_ID: new FormControl(''),
      SCALAR_FACTOR: new FormControl(''),
      SCALAR_ID: new FormControl(''),
      VECTOR: new FormControl(''),
      COORDINATE: new FormControl(''),
      VALUE: new FormControl(''),
      STATUS: new FormControl(''),
      SYMBOL: new FormControl(''),
      TERMINATED: new FormControl(''),
      DECIMALS: new FormControl('')
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
      ID: new FormControl(data.ID),
      REF_DATE: new FormControl(data.REF_DATE),
      GEO: new FormControl(data.GEO),
      DGUID: new FormControl(data.DGUID),
      PRODUCT: new FormControl(data.PRODUCT),
      STORAGE: new FormControl(data.STORAGE),
      UOM: new FormControl(data.UOM),
      UOM_ID: new FormControl(data.UOM_ID),
      SCALAR_FACTOR: new FormControl(data.SCALAR_FACTOR),
      SCALAR_ID: new FormControl(data.SCALAR_ID),
      VECTOR: new FormControl(data.VECTOR),
      COORDINATE: new FormControl(data.COORDINATE),
      VALUE: new FormControl(data.VALUE),
      STATUS: new FormControl(data.STATUS),
      SYMBOL: new FormControl(data.SYMBOL),
      TERMINATED: new FormControl(data.TERMINATED),
      DECIMALS: new FormControl(data.DECIMALS)
    });
  }

  onSubmit(): void {
    const dataToBeUpdated = { ...this.dataForm.value, ID: this.dataId };
    
    this.theDataService.updateData(dataToBeUpdated).subscribe(
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
