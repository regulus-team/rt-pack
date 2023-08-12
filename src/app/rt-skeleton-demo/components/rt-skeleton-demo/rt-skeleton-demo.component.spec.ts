import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtSkeletonDemoComponent } from './rt-skeleton-demo.component';

describe('RtSkeletonDemoComponent', () => {
  let component: RtSkeletonDemoComponent;
  let fixture: ComponentFixture<RtSkeletonDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RtSkeletonDemoComponent]
    });
    fixture = TestBed.createComponent(RtSkeletonDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
