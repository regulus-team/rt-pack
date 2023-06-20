import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtCarouselPreviousButtonComponent } from './rt-carousel-previous-button.component';

describe('RtCarouselPreviousButtonComponent', () => {
  let component: RtCarouselPreviousButtonComponent;
  let fixture: ComponentFixture<RtCarouselPreviousButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RtCarouselPreviousButtonComponent]
    });
    fixture = TestBed.createComponent(RtCarouselPreviousButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
