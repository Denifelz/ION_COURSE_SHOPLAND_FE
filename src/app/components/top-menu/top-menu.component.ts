import { Component, Input } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { DataService } from './../../services';
import { User } from './../../models';
import { LoginFormComponent } from './../';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {
  @Input() title: string = '';

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private resultBar: MatSnackBar
  ) { }

  get user() {
    return this.dataService.user;
  }

  get favorites() {
    return this.dataService.favorites;
  }

  get orders() {
    return this.dataService.orders;
  }

  public openLoginForm() {
    this.dialog.open(LoginFormComponent).afterClosed().subscribe(successfully => { if(successfully) window.location.reload(); })
  }

  public logout() {
    localStorage.removeItem('user');

    this.resultBar.open('Logout Successful!', 'Close', { duration: 3000 });
    window.location.reload();
  }
}
