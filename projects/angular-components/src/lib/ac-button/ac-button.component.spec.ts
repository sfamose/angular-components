import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcButtonComponent } from './ac-button.component';

describe('AcButtonComponent', () => {
  let component: AcButtonComponent;
  let fixture: ComponentFixture<AcButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
