import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeaderComponent } from './table-header.component';
import {MaterialModule} from 'angular-components';
import {DEFAULT_LABELS, LABELS} from '../../config/default-config';

describe('TableHeaderComponent', () => {
  let component: TableHeaderComponent;
  let fixture: ComponentFixture<TableHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ TableHeaderComponent ],
      providers: [
        {
          provide: LABELS,
          useValue: DEFAULT_LABELS
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
