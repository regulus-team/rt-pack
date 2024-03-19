import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtToastComponent } from './rt-toast.component';

describe('RtToastComponent', () => {
  let component: RtToastComponent;
  let fixture: ComponentFixture<RtToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RtToastComponent]
    });
    fixture = TestBed.createComponent(RtToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
