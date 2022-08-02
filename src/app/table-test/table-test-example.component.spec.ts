import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTestExampleComponent } from './table-test-example.component';

describe('TableSortingExampleComponent', () => {
  let component: TableTestExampleComponent;
  let fixture: ComponentFixture<TableTestExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTestExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTestExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
