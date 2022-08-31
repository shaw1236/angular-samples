import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePoExampleComponent } from './simple-po-example.component';

describe('SimplePoExampleComponent', () => {
  let component: SimplePoExampleComponent;
  let fixture: ComponentFixture<SimplePoExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplePoExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePoExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
