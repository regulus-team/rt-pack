import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtCarouselNextButtonComponent } from './rt-carousel-next-button.component';

describe('RtCarouselNextButtonComponent', () => {
  let component: RtCarouselNextButtonComponent;
  let fixture: ComponentFixture<RtCarouselNextButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RtCarouselNextButtonComponent]
    });
    fixture = TestBed.createComponent(RtCarouselNextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
