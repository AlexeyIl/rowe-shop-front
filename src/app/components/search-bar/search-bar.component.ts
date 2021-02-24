import { BrowserCheckService } from './../../services/browser-check.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { SearchListItem } from '../../models/search-list-teim.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, AfterViewInit {
  isSlim: BehaviorSubject<boolean>;
  helpList: SearchListItem[];
  isLoading = false;
  catalogListIsOpen = false;

  @ViewChild('search') searchInput: ElementRef;
  @HostListener('document:click', [])
  private focusOut(): void {
    this.isLoading = false;
    this.helpList = [];
  }

  catalogListSwitch(): void {
    this.catalogListIsOpen = !this.catalogListIsOpen
  }

  clearInput(): void {
    this.isLoading = false;
    this.helpList = [];
    this.searchInput.nativeElement.value = '';
  }

  searchButton(): void {
    if (this.searchInput.nativeElement.value) {
      this.router.navigate(['search'], { queryParams: { search: this.searchInput.nativeElement.value } });
      this.clearInput();
    }
  }

  constructor(
    private catalogService: CatalogService, 
    private router: Router,
    private browserCheck: BrowserCheckService
    ) {}

  ngOnInit(): void {
    this.isSlim = this.browserCheck.isSlim();
  }

  ngAfterViewInit() {
    fromEvent<any>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter((vl) => vl),
        tap(() => {
          this.isLoading = true;
          this.helpList = [];
        }),
        debounceTime(500),
        switchMap((vl) =>
          this.catalogService.getSearchList(`${vl.target.value}`, 999)
        )
      )
      .subscribe((vl) => {
        this.isLoading = false;
        this.helpList = vl;
      });
  }
}
