import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-create',
  templateUrl: './data-create.component.html',
  styleUrls: ['./data-create.component.scss']
})
export class DataCreateComponent implements OnInit{
constructor(private theDataService: DataService, private router: Router) { }

dataForm!: FormGroup;

ngOnInit(): void {
    this.dataForm = new FormGroup({
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


  onSubmit() {
      this.theDataService.createData(this.dataForm.value).subscribe(
        response => {
          // Handling successful response here
          console.log('Data created successfully', response)
          this.router.navigate(['/']);
        },
        error => {
          // Handling error here
          console.error('There was an error!', error);
        }
      );
  }
  
}
