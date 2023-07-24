//CSVData.model.ts

/**
 * Makes a blueprint of our data for our server to load data. This is our entity
 */
export interface CSVData {
    _id: string;
    REF_DATE: string;
    GEO: string;
    PRODUCT: string;
    STORAGE: string;	
    UOM: string;
    VECTOR: string;
    COORDINATE: string;
    VALUE: number;
}