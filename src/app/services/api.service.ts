import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SpinnerComponent } from './../components';
import { User } from './../models';
import { Favorite } from './../models';
import { Order } from './../models';
import { Shoe } from './../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl: string = 'http://localhost:8080/api';
  private dialogConfig: MatDialogConfig = new MatDialogConfig();

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.dialogConfig.disableClose = true;
  }

  getUserByEmailAndPassword(emailAndPassword: any, next?: (shoes: any) => void) {
    this.snackBar.dismiss();
    const spinnerDialog = this.dialog.open(SpinnerComponent, this.dialogConfig);

    this.httpClient.post(this.apiUrl + '/users/byEmailAndPassword', emailAndPassword)
    .subscribe(
      (user) => {
        if(user) {
          this.snackBar.open('Sign In Successful!', 'Close', { duration: 3000 });
          spinnerDialog.close();

          if (next) next(user);
        } else {
          this.snackBar.open('Bad credentials!', 'Close', { duration: 3000 });
          spinnerDialog.close();
        }
      },
      (error) => {
        this.snackBar.open('Something went wrong! ' + this.getServerErrorMessage(error) + '.', 'Close');
        spinnerDialog.close()
      }
    );
  }

  addUser(user: User, next?: (shoes: any) => void) {
    this.snackBar.dismiss();
    const spinnerDialog = this.dialog.open(SpinnerComponent, this.dialogConfig);

    this.httpClient.post(this.apiUrl + '/users/add', user)
    .subscribe(
      (user) => {
        this.snackBar.open('Sign Up Successful!', 'Close', { duration: 3000 });
        spinnerDialog.close();

        if (next) next(user);
      },
      (error) => {
        this.snackBar.open('Something went wrong! ' + this.getServerErrorMessage(error) + '.', 'Close');
        spinnerDialog.close()
      }
    );
  }

  getShoes(user?: User, next?: (shoes: any) => void) {
    this.snackBar.dismiss();
    const spinnerDialog = this.dialog.open(SpinnerComponent, this.dialogConfig);

    this.httpClient.get(this.apiUrl + '/shoes' + ((user) ? '/' + user._id : ''))
    .subscribe(
      (shoes) => {
        this.snackBar.open('Load Successful!', 'Close', { duration: 3000 });
        spinnerDialog.close();

        if (next) next(shoes);
      },
      (error) => {
        this.snackBar.open('Something went wrong! ' + this.getServerErrorMessage(error) + '.', 'Close');
        spinnerDialog.close()
      }
    );
  }

  addShoe(shoe: Shoe, next?: (shoes: any) => void) {
    this.snackBar.dismiss();
    const spinnerDialog = this.dialog.open(SpinnerComponent, this.dialogConfig);

    this.httpClient.post(this.apiUrl + '/shoes/add', shoe)
    .subscribe(
      (shoes) => {
        this.snackBar.open('Shoe Add Successful!', 'Close', { duration: 3000 });
        spinnerDialog.close();

        if (next) next(shoes);
      },
      (error) => {
        this.snackBar.open('Something went wrong! ' + this.getServerErrorMessage(error) + '.', 'Close');
        spinnerDialog.close()
      }
    );
  }

  updateShoe(shoe: Shoe, next?: (shoes: any) => void) {
    this.snackBar.dismiss();
    const spinnerDialog = this.dialog.open(SpinnerComponent, this.dialogConfig);

    this.httpClient.put(this.apiUrl + '/shoes/update', shoe)
    .subscribe(
      (shoes) => {
        this.snackBar.open('Shoe Update Successful!', 'Close', { duration: 3000 });
        spinnerDialog.close();

        if (next) next(shoes);
      },
      (error) => {
        this.snackBar.open('Something went wrong! ' + this.getServerErrorMessage(error) + '.', 'Close');
        spinnerDialog.close()
      }
    );
  }

  deleteShoe(shoe: Shoe, next?: (shoes: any) => void) {
    this.snackBar.dismiss();
    const spinnerDialog = this.dialog.open(SpinnerComponent, this.dialogConfig);

    this.httpClient.delete(this.apiUrl + '/shoes/delete/' + shoe._id)
    .subscribe(
      (shoes) => {
        this.snackBar.open('Shoe Delete Successful!', 'Close', { duration: 3000 });
        spinnerDialog.close();

        if (next) next(shoes);
      },
      (error) => {
        this.snackBar.open('Something went wrong! ' + this.getServerErrorMessage(error) + '.', 'Close');
        spinnerDialog.close()
      }
    );
  }

  getFavorites(user: User, next?: (favorites: any) => void) {
    this.snackBar.dismiss();
    const spinnerDialog = this.dialog.open(SpinnerComponent, this.dialogConfig);

    this.httpClient.get(this.apiUrl + '/favorites/' + user._id)
    .subscribe(
      (favorites) => {
        this.snackBar.open('Load Successful!', 'Close', { duration: 3000 });
        spinnerDialog.close();

        if (next) next(favorites);
      },
      (error) => {
        this.snackBar.open('Something went wrong! ' + this.getServerErrorMessage(error) + '.', 'Close');
        spinnerDialog.close()
      }
    );
  }

  addFavorite(favorite: Favorite, next?: (shoes: any) => void) {
    this.snackBar.dismiss();
    const spinnerDialog = this.dialog.open(SpinnerComponent, this.dialogConfig);

    this.httpClient.post(this.apiUrl + '/favorites/add', favorite)
    .subscribe(
      (favorite) => {
        this.snackBar.open('Favorite Add Successful!', 'Close', { duration: 3000 });
        spinnerDialog.close();

        if (next) next(favorite);
      },
      (error) => {
        this.snackBar.open('Something went wrong! ' + this.getServerErrorMessage(error) + '.', 'Close');
        spinnerDialog.close()
      }
    );
  }

  deleteFavorite(favorite: Favorite, next?: (shoes: any) => void) {
    this.snackBar.dismiss();
    const spinnerDialog = this.dialog.open(SpinnerComponent, this.dialogConfig);

    this.httpClient.delete(this.apiUrl + '/favorites/delete', { body: favorite })
    .subscribe(
      (favorite) => {
        this.snackBar.open('Favorite Delete Successful!', 'Close', { duration: 3000 });
        spinnerDialog.close();

        if (next) next(favorite);
      },
      (error) => {
        this.snackBar.open('Something went wrong! ' + this.getServerErrorMessage(error) + '.', 'Close');
        spinnerDialog.close()
      }
    );
  }

  getOrders(user: User, next?: (orders: any) => void) {
    this.snackBar.dismiss();
    const spinnerDialog = this.dialog.open(SpinnerComponent, this.dialogConfig);

    this.httpClient.get(this.apiUrl + '/orders/' + user._id)
    .subscribe(
      (orders) => {
        this.snackBar.open('Load Successful!', 'Close', { duration: 3000 });
        spinnerDialog.close();

        if (next) next(orders);
      },
      (error) => {
        this.snackBar.open('Something went wrong! ' + this.getServerErrorMessage(error) + '.', 'Close');
        spinnerDialog.close()
      }
    );
  }

  addOrder(order: Order, next?: (shoes: any) => void) {
    this.snackBar.dismiss();
    const spinnerDialog = this.dialog.open(SpinnerComponent, this.dialogConfig);

    this.httpClient.post(this.apiUrl + '/orders/add', order)
    .subscribe(
      (order) => {
        this.snackBar.open('Order Add Successful!', 'Close', { duration: 3000 });
        spinnerDialog.close();

        if (next) next(order);
      },
      (error) => {
        this.snackBar.open('Something went wrong! ' + this.getServerErrorMessage(error) + '.', 'Close');
        spinnerDialog.close()
      }
    );
  }

  incrementOrderAmount(order: Order, next?: () => void) {
    this.snackBar.dismiss();
    const spinnerDialog = this.dialog.open(SpinnerComponent, this.dialogConfig);

    this.httpClient.put(this.apiUrl + '/orders/incrementAmount', order)
    .subscribe(
      () => {
        this.snackBar.open('Order Update Successful!', 'Close', { duration: 3000 });
        spinnerDialog.close();

        if (next) next();
      },
      (error) => {
        this.snackBar.open('Something went wrong! ' + this.getServerErrorMessage(error) + '.', 'Close');
        spinnerDialog.close()
      }
    );
  }

  decrementOrderAmount(order: Order, next?: () => void) {
    this.snackBar.dismiss();
    const spinnerDialog = this.dialog.open(SpinnerComponent, this.dialogConfig);

    this.httpClient.put(this.apiUrl + '/orders/decrementAmount', order)
    .subscribe(
      () => {
        this.snackBar.open('Order Update Successful!', 'Close', { duration: 3000 });
        spinnerDialog.close();

        if (next) next();
      },
      (error) => {
        this.snackBar.open('Something went wrong! ' + this.getServerErrorMessage(error) + '.', 'Close');
        spinnerDialog.close()
      }
    );
  }

  deleteOrder(order: Order, next?: (shoes: any) => void) {
    this.snackBar.dismiss();
    const spinnerDialog = this.dialog.open(SpinnerComponent, this.dialogConfig);

    this.httpClient.delete(this.apiUrl + '/orders/delete', { body: order })
    .subscribe(
      (order) => {
        this.snackBar.open('Order Delete Successful!', 'Close', { duration: 3000 });
        spinnerDialog.close();

        if (next) next(order);
      },
      (error) => {
        this.snackBar.open('Something went wrong! ' + this.getServerErrorMessage(error) + '.', 'Close');
        spinnerDialog.close()
      }
    );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
        return 'Error: ' + error.error.message;
    } else {
      switch (error.status) {
        case 404: return 'Not Found: ' + error.message;
        case 403: return 'Access Denied: ' + error.message;
        case 500: return 'Internal Server Error: ' + error.message;
        default: return 'Unknown Server Error: ' + error.message;
      }
    }
  }
}
