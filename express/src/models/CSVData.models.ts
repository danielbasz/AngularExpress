/**
 * Makes a blueprint of our data for our server to load data. This is our entity
 */
export interface CSVData {
    REF_DATE: string;
    GEO: string;
    DGUID: string;
    'Type of product': string;
    'Type of storage': string;	
    UOM: string;
    UOM_ID: string;
    SCALAR_FACTOR: string;
    SCALAR_ID: number;
    VECTOR: string;
    COORDINATE: string;
    VALUE: number;
    STATUS: string;
    SYMBOL: string;
    TERMINATED: string;
    DECIMALS: number;
}