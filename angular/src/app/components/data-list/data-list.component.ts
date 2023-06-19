import { Component, OnInit } from '@angular/core';
import { CSVData } from 'src/app/models/CSVData.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { response } from 'express';
import * as csvParser from 'csv-parser';
import { parse } from 'path';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  data: CSVData[] = [];
  constructor(private theDataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.theDataService.getData().subscribe((data: CSVData[]) => {
      this.data = data;
    });
  }

  detailData(id: string) {
    this.router.navigate([`detail/${id}`]);
  }

 // Save data
saveData(): void {
  this.theDataService.saveData(this.data).subscribe(
    (response: CSVData[]) => {
      // Handle the successful save operation
    },
    (error: any) => {
      // Handle the error
    }
  );
}


 // Reload original data
reloadOriginalData(): void {
  this.theDataService.reloadData().subscribe(
    (data: CSVData[]) => {
      // Process the retrieved data
    },
    (error: any) => {
      // Handle the error
    }
  );
}

  // Save data as a new file
saveDataAsNewFile(): void {
  this.theDataService.saveAsNewFile(this.data).subscribe(
    (response: CSVData[]) => {
      // Handle the successful save operation
    },
    (error: any) => {
      // Handle the error
    }
  );
}

// Load new CSV data file
onFileSelected(event: Event): void {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const fileData = e.target?.result as string;
      const parsedCSV = this.theDataService.parseCSVData(fileData);

      // Call the saveAs function in your data service
      this.theDataService.saveAsNewFile(parsedCSV)
        .subscribe(
          (data: CSVData[]) => {
            // Handle the successful save operation
            this.data = data;
          },
          (error: any) => {
            // Handle the error if needed
            console.error('Error loading new CSV data:', error);
          }
        );
    };

    reader.readAsText(file);
  }
}
}
