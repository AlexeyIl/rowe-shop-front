import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const openCloseFastAnimation = trigger('openClose', [
  state(
    'open',
    style({
      opacity: 1,
    })
  ),
  state(
    'closed',
    style({
      opacity: 0,
    })
  ),
  transition('open => closed', [animate('0.3s')]),
  transition('closed => open', [animate('0.3s')]),
]);
