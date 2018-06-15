import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsSideNavComponent } from './icons-side-nav.component';

describe('IconsSideNavComponent', () => {
  let component: IconsSideNavComponent;
  let fixture: ComponentFixture<IconsSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconsSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
