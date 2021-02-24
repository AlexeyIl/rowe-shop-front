import { PathBarInterface } from './../path-bar/path-bar.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  path: PathBarInterface[] = [{name: 'О Компании', link: '/about'}]

  constructor() { }

  ngOnInit(): void {
  }

}
