import { Injectable } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from './api.service';
import { User } from './../models';
import { Favorite } from './../models';
import { Order } from './../models';
import { Shoe } from './../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _user: User = new User();
  private _favorites: Favorite[] = [];
  private _orders: Order[] = [];

  public favoritesDataSource: MatTableDataSource<Favorite> = new MatTableDataSource();
  public ordersDataSource: MatTableDataSource<Order> = new MatTableDataSource();

  constructor(
    public apiService: ApiService
  ) {
    try { this._user = JSON.parse(localStorage.getItem('user') || ''); } catch {}

    if(this._user) {
      this.apiService.getFavorites(this._user, favorites => this.favorites = favorites);
      this.apiService.getOrders(this._user, orders => this.orders = orders);
    }
  }

  get user(): User {
    return this._user;
  }

  get favorites(): Favorite[] {
    return this._favorites;
  }

  get orders(): Order[] {
    return this._orders;
  }

  set favorites(favorites: Favorite[]) {
    this._favorites = favorites;

    this.prepareDataSource();
  }

  set orders(orders: Order[]) {
    this._orders = orders;

    this.prepareDataSource();
  }

  private prepareDataSource() {
      this.favoritesDataSource.data = this._favorites.map(
        (favorite) => {
          const order = this._orders.find(order => order.product == favorite.product && order.productId == favorite.productId);

          return { ...favorite, ...order };
        }
      );

      this.ordersDataSource.data = this._orders.map(
        (order) => {
          const favorite = this._favorites.find(favorite => favorite.product == order.product && favorite.productId == order.productId);

          return { ...order, ...favorite };
        }
      );
  }

  public addFavorite(favorite: Favorite, next?: () => void) {
    this.apiService.addFavorite(favorite,
      () => {
        this.favorites = [...this.favorites, favorite];

        if (next) next();
      }
    );
  }

  public deleteFavorite(favorite: Favorite, next?: () => void) {
    this.apiService.deleteFavorite(favorite,
      () => {
        this.favorites = this.favorites.filter(element => element.product != favorite.product || element.productId != favorite.productId);

        if (next) next();
      }
    );
  }

  public addOrder(order: Order, next?: () => void) {
    this.apiService.addOrder(order,
      () => {
        this.orders = [...this.orders, order];

        if (next) next();
      }
    );
  }

  public deleteOrder(order: Order) {
    this.apiService.deleteOrder(order,
      () => {
        this.orders = this.orders.filter(element => element.product != order.product || element.productId != order.productId);
      }
    );
  }

  public incrementOrderAmount(order: Order, next?: () => void) {
    this.apiService.incrementOrderAmount(order,
      () => {
        this.orders = this.orders.map(element => { if (element.product == order.product && element.productId == order.productId) element.productAmount++; return element});

        if (next) next();
      }
    );
  }

  public decrementOrderAmount(order: Order) {
    this.apiService.decrementOrderAmount(order,
      () => {
        this.orders = this.orders.map(element => { if (element.product == order.product && element.productId == order.productId) element.productAmount--; return element});
      }
    );
  }
}
