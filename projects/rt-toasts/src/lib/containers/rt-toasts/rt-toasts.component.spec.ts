import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtToastsComponent } from './rt-toasts.component';

describe('RtToastsComponent', () => {
  let component: RtToastsComponent;
  let fixture: ComponentFixture<RtToastsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RtToastsComponent]
    });
    fixture = TestBed.createComponent(RtToastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
