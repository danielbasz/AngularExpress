import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCreateComponent } from './data-create.component';

describe('DataCreateComponent', () => {
  let component: DataCreateComponent;
  let fixture: ComponentFixture<DataCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataCreateComponent]
    });
    fixture = TestBed.createComponent(DataCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
