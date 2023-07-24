import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { CSVData } from '../models/CSVData.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('getAllData should make a GET request', done => {
    service.getAllData().subscribe(() => {
      done();
    });

    const req = httpMock.expectOne('http://localhost:3000/api/data');
    expect(req.request.method).toBe('GET');
  });

  it('getDataById should make a GET request', done => {
    const id = '64bc7a8ce64083373c174226';

    service.getDataById(id).subscribe(() => {
      done();
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/data/${id}`);
    expect(req.request.method).toBe('GET');
  });

  it('addData should make a POST request', done => {
    const data: CSVData = {
      "_id": "64bc7a8ce64083373c17422c",
      "REF_DATE": "Jan-70",
      "GEO": "Quebec",
      "PRODUCT": "Cabbage",
      "STORAGE": "Cold and common storage",
      "UOM": "Tonnes",
      "VECTOR": "v722368",
      "COORDINATE": "3.4.1",
      "VALUE": "618"
    };

    service.addData(data).subscribe(() => {
      done();
    });

    const req = httpMock.expectOne('http://localhost:3000/api/data');
    expect(req.request.method).toBe('POST');
  });

  it('updateData should make a PUT request', done => {
    const id = '64bc7a8ce64083373c17422c';
    const data: CSVData = {
      "_id": "64bc7a8ce64083373c17422c",
      "REF_DATE": "Jan-70",
      "GEO": "Quebec",
      "PRODUCT": "Cabbage",
      "STORAGE": "Cold and common storage",
      "UOM": "Tonnes",
      "VECTOR": "v722368",
      "COORDINATE": "3.4.1",
      "VALUE": "618"
    };

    service.updateData(id, data).subscribe(() => {
      done();
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/data/${id}`);
    expect(req.request.method).toBe('PUT');
  });

  it('deleteData should make a DELETE request', done => {
    const id = '64bc7a8ce64083373c17422c';

    service.deleteData(id).subscribe(() => {
      done();
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/data/${id}`);
    expect(req.request.method).toBe('DELETE');
  });
});
