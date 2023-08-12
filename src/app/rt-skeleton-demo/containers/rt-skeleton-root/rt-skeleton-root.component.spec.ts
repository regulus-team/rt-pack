import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtSkeletonRootComponent } from './rt-skeleton-root.component';

describe('RtSkeletonRootComponent', () => {
  let component: RtSkeletonRootComponent;
  let fixture: ComponentFixture<RtSkeletonRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RtSkeletonRootComponent]
    });
    fixture = TestBed.createComponent(RtSkeletonRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
