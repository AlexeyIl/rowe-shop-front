import { BehaviorSubject } from 'rxjs';
import { BrowserCheckService } from 'src/app/services/browser-check.service';
import { CatalogService } from './../../services/catalog.service';
import { CatalogListItemInterface } from './../../services/data/catalog-list';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-catalog-dropdown',
  templateUrl: './catalog-dropdown.component.html',
  styleUrls: ['./catalog-dropdown.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'translateY(0)',
        'box-shadow': '0 10px 10px rgba(0,0,0,0.3)'

      })),
      state('closed', style({
        transform: 'translateY(-360px)',
        'box-shadow': '0 -5px 10px rgba(0,0,0,0.3)'
        
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ])
    ])
  ],
})
export class CatalogDropdownComponent implements OnInit {
  @Output()closeCatalogListEmitter = new EventEmitter();
  @Input() set isOpenCheck(vl: boolean) {
    if(vl) {
      this.isOpen = true;
      this.isShow = true
    } else {
      this.isOpen = false;
      setTimeout(() => {
        this.isShow = false;
      }, 300);
    }
  }

  catalogList: CatalogListItemInterface[];
  isSlim: BehaviorSubject<boolean>;
  isOpen = false;
  isShow = false;

  closeMenu(): void {
    this.isOpen = false;
    setTimeout(() => {
      this.closeCatalogListEmitter.emit();
    }, 300);
  }

  constructor(
    private catalogService: CatalogService,
    private browserCheckService: BrowserCheckService
  ) { }

  ngOnInit(): void {
    this.isSlim = this.browserCheckService.isSlim();
    this.catalogList = this.catalogService.getCategoryList();
  }
}
