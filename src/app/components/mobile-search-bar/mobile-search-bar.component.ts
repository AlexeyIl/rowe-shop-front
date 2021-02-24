import { Router } from '@angular/router';
import { CatalogService } from './../../services/catalog.service';
import { SearchListItem } from './../../models/search-list-teim.model';
import { filter, tap, debounceTime, switchMap } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-mobile-search-bar',
  templateUrl: './mobile-search-bar.component.html',
  styleUrls: ['./mobile-search-bar.component.scss']
})
export class MobileSearchBarComponent implements AfterViewInit {
  helpIsOpen = false;
  isLoading = false;
  helpList: SearchListItem[];

  @ViewChild('search') searchInput: ElementRef;

  inputFocus(): void {
    this.helpIsOpen = true;
  }

  cancelHelp(): void {
    this.helpIsOpen = false;
    this.helpList = [];
    this.isLoading = false;
    this.searchInput.nativeElement.value = '';
  }

  navigateTo(item: SearchListItem): void {
    this.cancelHelp();
    this.router.navigate(['/catalog/', item.code]);
  }

  constructor(
    private catalogService: CatalogService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    fromEvent<any>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter((vl) => vl),
        tap(() => {
          this.isLoading = true;
          this.helpIsOpen =true;
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
