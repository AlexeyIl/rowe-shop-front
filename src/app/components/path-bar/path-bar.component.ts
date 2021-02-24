import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-path-bar',
  templateUrl: './path-bar.component.html',
  styleUrls: ['./path-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PathBarComponent implements OnChanges {
  @Input() path: PathBarInterface[];
  title: PathBarInterface = {
    name: 'ROWE Shop',
    link: ''
  };
  pathArrray: PathBarInterface[];
  constructor() {}

  ngOnChanges(): void {
    if (this.path) {
      this.pathArrray = [this.title, ...this.path];
    }
  }
}

export interface PathBarInterface {
  name: string,
  link: string,
  queryParams?: object
}
