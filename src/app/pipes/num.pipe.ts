import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'num',
})
export class NumPipe implements PipeTransform {
  transform(val: number): unknown {
    if (val !== undefined && val !== null) {
      return val.toLocaleString('ru-RU');
    } else {
      return '';
    }
  }
}
