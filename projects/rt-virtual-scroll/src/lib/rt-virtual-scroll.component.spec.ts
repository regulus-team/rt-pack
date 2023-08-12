import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtVirtualScrollComponent } from './rt-virtual-scroll.component';

describe('RtVirtualScrollComponent', () => {
  let component: RtVirtualScrollComponent;
  let fixture: ComponentFixture<RtVirtualScrollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RtVirtualScrollComponent]
    });
    fixture = TestBed.createComponent(RtVirtualScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
