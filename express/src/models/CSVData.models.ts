//CSVData.model.ts

/**
 * Makes a blueprint of our data for our server to load data. This is our entity
 */
export interface CSVData {
    ID: number;
    REF_DATE: string;
    GEO: string;
    DGUID: string;
    TOP: string;
    TOS: string;	
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