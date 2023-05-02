import { Component } from '@angular/core';

import { DataService } from './../../services';
import { Favorite } from './../../models';
import { Order } from './../../models';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  public displayedColumns: string[] = ['deleteButton', 'shoppingButton', 'image', 'name', 'price'];

  constructor (
    private dataService: DataService,
  ) { }

  get source() {
    return this.dataService.favoritesDataSource;
  }

  public delete(favorite: Favorite) {
    this.dataService.deleteFavorite(favorite);
  }

  public addOrder(favorite: Favorite) {
    const order = new Order();
    order.userId = favorite.userId;
    order.product = favorite.product;
    order.productId = favorite.productId;
    order.productAmount = 1;
    order.productName = favorite.productName;
    order.productPrice = favorite.productPrice;
    order.productImage = favorite.productImage;

    this.dataService.addOrder(order);
  }

  public incrementOrderAmount(favorite: Favorite) {
    const order = new Order();
    order.userId = favorite.userId;
    order.product = favorite.product;
    order.productId = favorite.productId;
    order.productAmount = 1;
    order.productName = favorite.productName;
    order.productPrice = favorite.productPrice;
    order.productImage = favorite.productImage;

    this.dataService.incrementOrderAmount(order);
  }
}
