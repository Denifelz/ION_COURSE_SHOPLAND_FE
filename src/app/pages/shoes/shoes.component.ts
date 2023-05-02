import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { DataService } from './../../services';
import { ApiService } from './../../services';
import { Favorite } from './../../models';
import { Order } from './../../models';
import { Shoe } from './../../models';
import { ShoeFormComponent } from './';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.scss']
})
export class ShoesComponent {
  public shoeNameFilter: string = '';
  public shoes: Shoe[] = [];

  constructor(
    private dataService: DataService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {
    this.getShoesList();
  }

  get user() {
    return this.dataService.user;
  }

  private getShoesList() {
    this.apiService.getShoes(this.user, shoes => this.shoes = shoes);
  }

  public shoeView(shoe: Shoe) {
    const shoeView = this.dialog.open(ShoeFormComponent);

    shoeView.componentInstance.action = 'view';
    shoeView.componentInstance.shoe = shoe;
  }

  public shoeAdd() {
    const shoeAdd = this.dialog.open(ShoeFormComponent);

    shoeAdd.componentInstance.action = 'add';

    shoeAdd.afterClosed().subscribe(successfully => { if(successfully) this.getShoesList() });
  }

  public shoeUpdate(shoe: Shoe) {
    const shoeUpdate = this.dialog.open(ShoeFormComponent);

    shoeUpdate.componentInstance.action = 'update';
    shoeUpdate.componentInstance.shoe = shoe;

    shoeUpdate.afterClosed().subscribe(successfully => { if(successfully) this.getShoesList() });
  }

  public shoeDelete(shoe: Shoe) {
    const shoeDelete = this.dialog.open(ShoeFormComponent);

    shoeDelete.componentInstance.action = 'delete';
    shoeDelete.componentInstance.shoe = shoe;

    shoeDelete.afterClosed().subscribe(successfully => { if(successfully) this.getShoesList() });
  }

  public addToFavorites(shoe: Shoe) {
    const favorite = new Favorite();
    favorite.userId = this.user._id;
    favorite.product = 'shoe';
    favorite.productId = shoe._id;
    favorite.productName = shoe.name;
    favorite.productPrice = shoe.price;
    favorite.productImage = shoe.image;

    this.dataService.addFavorite(favorite, () => shoe.isFavorite = true);
  }

  public deleteFromFavorites(shoe: Shoe) {
    const favorite = new Favorite();
    favorite.userId = this.user._id;
    favorite.product = 'shoe';
    favorite.productId = shoe._id;
    favorite.productName = shoe.name;
    favorite.productPrice = shoe.price;
    favorite.productImage = shoe.image;

    this.dataService.deleteFavorite(favorite, () => shoe.isFavorite = false);
  }

  public addToOrders(shoe: Shoe) {
    const order = new Order();
    order.userId = this.user._id;
    order.product = 'shoe';
    order.productId = shoe._id;
    order.productAmount = 1;
    order.productName = shoe.name;
    order.productPrice = shoe.price;
    order.productImage = shoe.image;

    this.dataService.addOrder(order, () => shoe.orderAmount = 1);
  }

  public incrementOrderAmount(shoe: Shoe) {
    const order = new Order();
    order.userId = this.user._id;
    order.product = 'shoe';
    order.productId = shoe._id;
    order.productAmount = shoe.orderAmount;
    order.productName = shoe.name;
    order.productPrice = shoe.price;
    order.productImage = shoe.image;

    this.dataService.incrementOrderAmount(order, () => shoe.orderAmount++);
  }
}
