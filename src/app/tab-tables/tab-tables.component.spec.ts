import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTablesComponent } from './tab-tables.component';

describe('TabTablesComponent', () => {
  let component: TabTablesComponent;
  let fixture: ComponentFixture<TabTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
