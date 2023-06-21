import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'rt-tab-carousel-previous-button',
  templateUrl: './rt-carousel-previous-button.component.html',
  styleUrls: ['./rt-carousel-previous-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RtCarouselPreviousButtonComponent {
  @Input({required: true}) uuidCarousel!: string;
  @Input() autoHide = true;
}
