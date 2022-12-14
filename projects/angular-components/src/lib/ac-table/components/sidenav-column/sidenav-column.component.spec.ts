import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavColumnComponent } from './sidenav-column.component';

describe('SidenavColumnComponent', () => {
  let component: SidenavColumnComponent;
  let fixture: ComponentFixture<SidenavColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
