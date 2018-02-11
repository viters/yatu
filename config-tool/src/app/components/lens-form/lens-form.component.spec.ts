import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LensFormComponent } from './lens-form.component';

describe('LensFormComponent', () => {
  let component: LensFormComponent;
  let fixture: ComponentFixture<LensFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LensFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LensFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
