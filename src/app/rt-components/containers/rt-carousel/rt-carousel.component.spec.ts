import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtCarouselComponent } from './rt-carousel.component';

describe('RtCarouselComponent', () => {
  let component: RtCarouselComponent;
  let fixture: ComponentFixture<RtCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RtCarouselComponent]
    });
    fixture = TestBed.createComponent(RtCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
