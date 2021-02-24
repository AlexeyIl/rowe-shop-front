import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-badge',
  templateUrl: './product-badge.component.html',
  styleUrls: ['./product-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductBadgeComponent implements OnInit {
  @Input() item: ProductModel;
  @Input() isFavorite: boolean;

  @Output() addOne = new EventEmitter<ProductModel>();
  @Output() addFavorite = new EventEmitter<ProductModel>();
  @Output() removeFavorite = new EventEmitter<ProductModel>();

  addToCart(item): void {
    this.addOne.emit(item);
  }

  addToFavorites(item): void {
    this.addFavorite.emit(item);
  }
  
  removeFromFavorites(item): void {
    this.removeFavorite.emit(item)
  }

  dc(): void {
    this.ref.detectChanges();
  }
  
  constructor(
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
}
