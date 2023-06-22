import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtTableMovingComponent } from './rt-table-moving.component';

describe('RtTableMovingComponent', () => {
  let component: RtTableMovingComponent;
  let fixture: ComponentFixture<RtTableMovingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RtTableMovingComponent]
    });
    fixture = TestBed.createComponent(RtTableMovingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
