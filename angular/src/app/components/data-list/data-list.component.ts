/**
 * By Daniel Barboza
 * As Part of Algonquin College Research on Typescript
 * id: 041025651
 * LAST UPDATED AUG/06/2023
 */


import { Component, OnInit } from '@angular/core';
import { CSVData } from 'src/app/models/CSVData.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})

/**
 * DataListComponent handles the viewing of our Data List. It also displays pie charts at the user's disposal of tonnage per product
 * and how many rows were parsed per product. 
 */
export class DataListComponent implements OnInit {

  // Default chart type
  selectedChart: string = 'pie'; 

  // Chart configuration properties 
  view: [number, number] = [1200, 400];
  colorScheme = 'vivid';
  showLegend = true;
  explodeSlices = false;
  showLabels = true;
  doughnut = false;
  gradient = false;

  
  // Chart data for different products and months 
  pieChartData: any[] = [];
  januaryChartData: any[] = [];
  februaryChartData: any[] = [];
  marchChartData: any[] = [];
  aprilChartData: any[] = [];

  // Count and tonnage for different products by month initialization
  productCounts: { Potatoes: number, Onions: number, Carrots: number, Cabbage: number } = { Potatoes: 0, Onions: 0, Carrots: 0, Cabbage: 0 };
  januaryTonnage: { Potatoes: number, Onions: number, Carrots: number, Cabbage: number } = { Potatoes: 0, Onions: 0, Carrots: 0, Cabbage: 0 };
  februaryTonnage: { Potatoes: number, Onions: number, Carrots: number, Cabbage: number } = { Potatoes: 0, Onions: 0, Carrots: 0, Cabbage: 0 };
  marchTonnage: { Potatoes: number, Onions: number, Carrots: number, Cabbage: number } = { Potatoes: 0, Onions: 0, Carrots: 0, Cabbage: 0 };
  aprilTonnage: { Potatoes: number, Onions: number, Carrots: number, Cabbage: number } = { Potatoes: 0, Onions: 0, Carrots: 0, Cabbage: 0 };
  
  //Aray to hold our data model.
  data: CSVData[] = [];

  /**
   * Constructor to inject the necessary services
   * @param theDataService - Service to handle data operations
   * @param router - Angular router for navigation
   */
  constructor(private theDataService: DataService, private router: Router) { }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized
   */
  ngOnInit(): void {
    this.theDataService.getAllData().subscribe((data: CSVData[]) => {
      this.data = data;
      this.productCounts = this.getProductCounts();
      this.januaryTonnage = this.loadJanuaryData();
      this.februaryTonnage = this.loadFebruaryData();
      this.marchTonnage = this.loadMarchData();
      this.aprilTonnage = this.loadAprilData();
      this.initializeChartData();
  });

}

  /**
   * Function to initialize chart data
   */
private initializeChartData() {
  this.pieChartData = [
    { name: 'Potatoes', value: this.productCounts.Potatoes },
    { name: 'Onions', value: this.productCounts.Onions },
    { name: 'Carrots', value: this.productCounts.Carrots },
    { name: 'Cabbage', value: this.productCounts.Cabbage }
  ];
  this.januaryChartData = [
    { name: 'Tons of Potatoes', value: this.januaryTonnage.Potatoes},
    { name: 'Tons of Onions', value: this.januaryTonnage.Onions},
    { name: 'Tons of Carrots', value: this.januaryTonnage.Carrots},
    { name: 'Tons of Cabbage', value: this.januaryTonnage.Cabbage},
  ]
  this.februaryChartData = [
    { name: 'Tons of Potatoes', value: this.februaryTonnage.Potatoes},
    { name: 'Tons of Onions', value: this.januaryTonnage.Onions},
    { name: 'Tons of Carrots', value: this.januaryTonnage.Carrots},
    { name: 'Tons of Cabbage', value: this.januaryTonnage.Cabbage},
  ]
  this.marchChartData = [
    { name: 'Potato Tons', value: this.marchTonnage.Potatoes},
    { name: 'Tons of Onions', value: this.marchTonnage.Onions},
    { name: 'Tons of Carrots', value: this.marchTonnage.Carrots},
    { name: 'Tons of Cabbage', value: this.marchTonnage.Cabbage},
  ]
  this.aprilChartData = [
    { name: 'Tons of Potatoes', value: this.aprilTonnage.Potatoes},
    { name: 'Tons of Onions', value: this.aprilTonnage.Onions},
    { name: 'Tons of Carrots', value: this.aprilTonnage.Carrots},
    { name: 'Tons of Cabbage', value: this.aprilTonnage.Cabbage},
  ]
}

 /**
   * Function to navigate to detail view
   * @param id - ID of the selected item
   */
  detailData(id: string) {
    this.router.navigate([`detail/${id}`]);
  }

  /**
   * Function to get the count of products
   * @returns - Object containing counts for different products
   */
  getProductCounts() {
    const productCounts = {
      Potatoes: 0,
      Onions: 0,
      Carrots: 0,
      Cabbage: 0
    };
  
    this.data.forEach(item => {
      if (item.PRODUCT === 'Potatoes') productCounts.Potatoes++;
      if (item.PRODUCT === 'Onions') productCounts.Onions++;
      if (item.PRODUCT === 'Carrots') productCounts.Carrots++;
      if (item.PRODUCT === 'Cabbage') productCounts.Cabbage++;
    });
  
    return productCounts;
  }
  
  /**
   * Function to select a specific chart type
   * @param chartType - Type of the chart
   */
  selectChart(chartType: string) {
    this.selectedChart = chartType;
  }
  
  /**
   * Function to load January data
   * @returns - Object containing tonnage for different products in January
   */
  loadJanuaryData() {
    const januaryTonnage = {
      Potatoes: 0,
      Onions: 0,
      Carrots: 0,
      Cabbage: 0
    };
    
    //assuming data is loaded
    const januaryData = this.data.filter(item => item.REF_DATE.startsWith('Jan-'));
  
    // Group by product and sum values
    januaryData.forEach(item => {
      if( item.PRODUCT === 'Potatoes' ) januaryTonnage.Potatoes = januaryTonnage.Potatoes + parseInt(item.VALUE);
      if( item.PRODUCT === 'Onions' ) januaryTonnage.Onions = januaryTonnage.Onions + parseInt(item.VALUE);
      if( item.PRODUCT === 'Carrots' ) januaryTonnage.Carrots = januaryTonnage.Carrots + parseInt(item.VALUE);
      if( item.PRODUCT === 'Cabbage' ) januaryTonnage.Cabbage = januaryTonnage.Cabbage + parseInt(item.VALUE);
    });
  return januaryTonnage;
  }

   /**
   * Function to load February data
   * @returns - Object containing tonnage for different products in February
   */
  loadFebruaryData() {
    const februaryTonnage = {
      Potatoes: 0,
      Onions: 0,
      Carrots: 0,
      Cabbage: 0
    };
    // Assuming you have data loaded 
    const februaryData = this.data.filter(item => item.REF_DATE.startsWith('Feb-'));
  
    // Group by product and sum values
    februaryData.forEach(item => {
      if( item.PRODUCT === 'Potatoes' ) februaryTonnage.Potatoes = februaryTonnage.Potatoes + parseInt(item.VALUE);
      if( item.PRODUCT === 'Onions' ) februaryTonnage.Onions = februaryTonnage.Onions + parseInt(item.VALUE);
      if( item.PRODUCT === 'Carrots' ) februaryTonnage.Carrots = februaryTonnage.Carrots + parseInt(item.VALUE);
      if( item.PRODUCT === 'Cabbage' ) februaryTonnage.Cabbage = februaryTonnage.Cabbage + parseInt(item.VALUE);
    });
  return februaryTonnage;
  }

   /**
   * Function to load March data
   * @returns - Object containing tonnage for different products in March
   */
  loadMarchData() {
    const marchTonnage = {
      Potatoes: 0,
      Onions: 0,
      Carrots: 0,
      Cabbage: 0
    };
    // Assuming you have data loaded 
    const marchData = this.data.filter(item => item.REF_DATE.startsWith('Mar-'));
  
    // Group by product and sum values
    marchData.forEach(item => {
      if( item.PRODUCT === 'Potatoes' ) marchTonnage.Potatoes = marchTonnage.Potatoes + parseInt(item.VALUE);
      if( item.PRODUCT === 'Onions' ) marchTonnage.Onions = marchTonnage.Onions + parseInt(item.VALUE);
      if( item.PRODUCT === 'Carrots' ) marchTonnage.Carrots = marchTonnage.Carrots + parseInt(item.VALUE);
      if( item.PRODUCT === 'Cabbage' ) marchTonnage.Cabbage = marchTonnage.Cabbage + parseInt(item.VALUE);
    });
  return marchTonnage;
  }

   /**
   * Function to load April data
   * @returns - Object containing tonnage for different products in April
   */
  loadAprilData() {
    const aprilTonnage = {
      Potatoes: 0,
      Onions: 0,
      Carrots: 0,
      Cabbage: 0
    };
    // Assuming you have data loaded 
    const aprilData = this.data.filter(item => item.REF_DATE.startsWith('Apr-'));
  
    // Group by product and sum values
    aprilData.forEach(item => {
      if( item.PRODUCT === 'Potatoes' ) aprilTonnage.Potatoes = aprilTonnage.Potatoes + parseInt(item.VALUE);
      if( item.PRODUCT === 'Onions' ) aprilTonnage.Onions = aprilTonnage.Onions + parseInt(item.VALUE);
      if( item.PRODUCT === 'Carrots' ) aprilTonnage.Carrots = aprilTonnage.Carrots + parseInt(item.VALUE);
      if( item.PRODUCT === 'Cabbage' ) aprilTonnage.Cabbage = aprilTonnage.Cabbage + parseInt(item.VALUE);
    });
  return aprilTonnage;
  }
}





