import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtTabCarouselComponent } from './rt-tab-carousel.component';

describe('RtTabCarouselComponent', () => {
  let component: RtTabCarouselComponent;
  let fixture: ComponentFixture<RtTabCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RtTabCarouselComponent]
    });
    fixture = TestBed.createComponent(RtTabCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
