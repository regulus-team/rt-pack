import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';

/** Angular animation that turn over applied element. Mostly used for dropdown arrows. */
export const TURN_OVER_ANIMATION = trigger('turnOver', [
  state(
    'level',
    style({
      transform: 'rotateX(0deg)',
    }),
  ),
  state(
    'turned',
    style({
      transform: 'rotateX(180deg)',
    }),
  ),
  transition('level <=> turned', [animate('0.3s ease-in')]),
]);

export const TURN_OVER_Z_ANIMATION = trigger('turnOver', [
  state(
    'level',
    style({
      transform: 'translateX(0px) translateZ(0px)',
    }),
  ),
  state(
    'turned',
    style({
      transform: 'rotateZ(90deg)',
    }),
  ),
  transition('level <=> turned', [animate('0.3s ease-in')]),
]);

export const DYNAMIC_FADE_OUT_SLOW = trigger('dynamicFadeOut', [
  transition(':leave', [group([animate('0.6s ease-out', style({opacity: 0})), animate('1s ease-in', style({height: 0}))])]),
]);

export const DYNAMIC_FADE_OUT = trigger('dynamicFadeOut', [
  transition(':leave', [group([animate('0.3s ease-out', style({opacity: 0})), animate('0.5s ease-in', style({height: 0}))])]),
]);

export const FADE_IN_SOFT = trigger('fadeInSoft', [
  transition(':enter', [
    animate('.3s', keyframes([
      style({opacity: 0}),
      style({opacity: 1}),
    ])),
  ]),
]);


export const FADE_OUT_SOFT = trigger('fadeOutSoft', [
  transition(':leave', [
    animate('.3s', keyframes([
      style({opacity: 1}),
      style({opacity: 0}),
    ])),
  ]),
]);


export const FADE_IN = trigger('fadeIn', [
  transition(':enter', [
    animate('.3s', keyframes([
      style({height: 0, opacity: 0}),
      style({height: '*'}),
      style({opacity: 1}),
    ])),
  ]),
]);


export const FADE_OUT = trigger('fadeOut', [
  transition(':leave', [
    animate('.3s', keyframes([
      style({height: '*', opacity: 1}),
      style({opacity: 0}),
      style({height: 0}),
    ])),
  ]),
]);




export const FADE_IN_HORIZONTAL = trigger('fadeInHorizontal', [
  transition(':enter', [
    animate('.3s', keyframes([
      style({width: 0, padding: 0, opacity: 0}),
      style({width: '*', padding: '*',}),
      style({opacity: 1}),
    ])),
  ]),
]);


export const FADE_OUT_HORIZONTAL = trigger('fadeOutHorizontal', [
  transition(':leave', [
    animate('.3s', keyframes([
      style({width: '*', opacity: 1}),
      style({width: 0, paddingLeft: 0, paddingRight: 0}),
      style({height: 0}),
    ])),
  ]),
]);

export const ROLL_IN = trigger('rollIn', [
  transition(':enter', [
    style({
      display: 'relative',
      height: 0,
      overflow: 'hidden',
    }),
    animate('0.4s ease-in', style({display: 'block', height: '*'})),
  ]),
]);

export const SLIDE_LEFT = trigger('open', [
  state(
    'opened',
    style({
      left: '0%',
    }),
  ),
  state(
    'closed',
    style({
      left: '100%',
    }),
  ),
  transition('opened <=> closed', [animate('0.2s ease-in')]),
]);
