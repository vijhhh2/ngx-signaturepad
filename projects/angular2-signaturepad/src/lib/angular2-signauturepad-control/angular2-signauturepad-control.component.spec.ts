import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Angular2SignauturepadControlComponent } from './angular2-signauturepad-control.component';

describe('Angular2SignauturepadControlComponent', () => {
  let component: Angular2SignauturepadControlComponent;
  let fixture: ComponentFixture<Angular2SignauturepadControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Angular2SignauturepadControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Angular2SignauturepadControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
