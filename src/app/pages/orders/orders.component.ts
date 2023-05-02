import { Component } from '@angular/core';

import { DataService } from './../../services';
import { Order } from './../../models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  public displayedColumns: string[] = ['deleteButton', 'image', 'name', 'price', '*', 'quantity', '=', 'totalPrice'];

  constructor (
      private dataService: DataService
  ) { }

  get source() {
    return this.dataService.ordersDataSource;
  }

  public delete(order: Order) {
    this.dataService.deleteOrder(order);
  }

  public decrement(order: Order) {
    this.dataService.decrementOrderAmount(order);
  }

  public increment(order: Order) {
    this.dataService.incrementOrderAmount(order);
  }

  get totalPrice() {
    return this.dataService.orders.map(order => order.productPrice * order.productAmount).reduce((totalPrice, price) => totalPrice + price, 0);
  }
}
