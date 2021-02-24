import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-confidential-politic-page',
  templateUrl: './confidential-politic-page.component.html',
  styleUrls: ['./confidential-politic-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfidentialPoliticPageComponent implements OnInit {
  path = [{name: 'Политика конфиденциальности', link: '/conf'}];

  constructor() { }

  ngOnInit(): void {
  }

}
