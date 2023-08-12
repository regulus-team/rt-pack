import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtVirtualScrollRootComponent } from './rt-virtual-scroll-root.component';

describe('RtVirtualScrollRootComponent', () => {
  let component: RtVirtualScrollRootComponent;
  let fixture: ComponentFixture<RtVirtualScrollRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RtVirtualScrollRootComponent]
    });
    fixture = TestBed.createComponent(RtVirtualScrollRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
