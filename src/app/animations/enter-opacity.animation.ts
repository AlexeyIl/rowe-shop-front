import { trigger, transition, style, animate } from '@angular/animations';
export const enterOpacityAnimation = 
trigger('open', [
    transition(':enter', [
      style({
        opacity: 0
      }),
      animate('0.3s',
        style({
          opacity: 1
       }))
    ])
  ])