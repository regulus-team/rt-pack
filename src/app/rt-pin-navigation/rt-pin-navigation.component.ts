import { Component } from '@angular/core';
import {RtPinNavigationDirective} from 'rt-pin-navigation';

@Component({
  standalone: true,
  selector: 'app-rt-pin-navigation',
  templateUrl: './rt-pin-navigation.component.html',
  imports: [
    RtPinNavigationDirective,
    RtPinNavigationDirective,
  ],
  styleUrls: ['./rt-pin-navigation.component.scss'],
})
export class RtPinNavigationComponent {

}
