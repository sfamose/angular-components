import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldChipsAutocompleteComponent } from './field-chips-autocomplete.component';

describe('FieldChipsAutocompleteComponent', () => {
  let component: FieldChipsAutocompleteComponent;
  let fixture: ComponentFixture<FieldChipsAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldChipsAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldChipsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
