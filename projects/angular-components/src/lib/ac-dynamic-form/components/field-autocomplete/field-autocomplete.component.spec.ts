import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldAutocompleteComponent } from './field-autocomplete.component';

describe('FieldAutocompleteComponent', () => {
  let component: FieldAutocompleteComponent;
  let fixture: ComponentFixture<FieldAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
