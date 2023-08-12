import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtTableMovingRootComponent } from './rt-table-moving-root.component';

describe('RtTableMovingRootComponent', () => {
  let component: RtTableMovingRootComponent;
  let fixture: ComponentFixture<RtTableMovingRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RtTableMovingRootComponent]
    });
    fixture = TestBed.createComponent(RtTableMovingRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
