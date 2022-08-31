import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSortingExampleComponent } from './table-sorting-example.component';

describe('TableSortingExampleComponent', () => {
  let component: TableSortingExampleComponent;
  let fixture: ComponentFixture<TableSortingExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSortingExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSortingExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
