import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRatingComponent } from './input-rating.component';

describe('InputRatingComponent', () => {
  let component: InputRatingComponent;
  let fixture: ComponentFixture<InputRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
