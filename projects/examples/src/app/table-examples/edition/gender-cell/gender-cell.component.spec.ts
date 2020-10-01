import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderCellComponent } from './gender-cell.component';

describe('GenderCellComponent', () => {
  let component: GenderCellComponent;
  let fixture: ComponentFixture<GenderCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenderCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
