import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'rt-tab-carousel-next-button',
  templateUrl: './rt-carousel-next-button.component.html',
  styleUrls: ['./rt-carousel-next-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RtCarouselNextButtonComponent {
  @Input({required: true}) uuidCarousel!: string;
  @Input() autoHide = true;
}
