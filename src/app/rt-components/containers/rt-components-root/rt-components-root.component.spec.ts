import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtComponentsRootComponent } from './rt-components-root.component';

describe('RtComponentsRootComponent', () => {
  let component: RtComponentsRootComponent;
  let fixture: ComponentFixture<RtComponentsRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RtComponentsRootComponent]
    });
    fixture = TestBed.createComponent(RtComponentsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
