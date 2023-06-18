//CSVData.model.ts

/**
 * Makes a blueprint of our data for our server to load data. This is our entity
 */
export interface CSVData {
    ID: string;
    REF_DATE: string;
    GEO: string;
    DGUID: string;
    PRODUCT: string;
    STORAGE: string;	
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