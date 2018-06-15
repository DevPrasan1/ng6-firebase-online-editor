import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorySideNavComponent } from './directory-side-nav.component';

describe('DirectorySideNavComponent', () => {
  let component: DirectorySideNavComponent;
  let fixture: ComponentFixture<DirectorySideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorySideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorySideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
