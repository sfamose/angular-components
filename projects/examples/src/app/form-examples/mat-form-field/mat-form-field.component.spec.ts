import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormFieldComponent } from './mat-form-field.component';

describe('MatFormFieldComponent', () => {
  let component: MatFormFieldComponent;
  let fixture: ComponentFixture<MatFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
