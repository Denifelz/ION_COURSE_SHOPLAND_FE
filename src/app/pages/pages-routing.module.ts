import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesComponent } from './';
import { OrdersComponent } from './';
import { ShoesComponent } from './';

const routes: Routes = [
  {path: 'favorites', component: FavoritesComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'shoes', component: ShoesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
