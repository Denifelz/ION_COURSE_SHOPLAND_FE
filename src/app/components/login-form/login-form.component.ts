import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { ApiService } from './../../services';
import { User } from './../../models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Input() user?: User;
  public signInForm: FormGroup;
  public signUpForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<LoginFormComponent>,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private resultBar: MatSnackBar
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      admin: [false]
    })
  }

  ngOnInit() {
    if(this.user) {
      this.signUpForm = this.formBuilder.group({
        _id: [this.user._id, Validators.required],
        email: [this.user.email, Validators.required],
        password: [this.user.password, Validators.required],
        passwordRepeat: ['', Validators.required],
        name: [this.user.name, Validators.required],
        surname: [this.user.surname, Validators.required],
        admin: [this.user.admin]
      })
    }
  }

  public signIn() {
    if(!this.signInForm.valid) return;

    this.apiService.getUserByEmailAndPassword(this.signInForm.value,
      user => {
        this.user = user as User;
        localStorage.setItem('user', JSON.stringify(user));
        this.dialogRef?.close(true);
      });
  }

  public signUp() {
    if(!this.signUpForm.valid) return;

    if(this.signUpForm.controls['password'].value != this.signUpForm.controls['passwordRepeat'].value) {
      this.resultBar.open('The password does not match!', 'Close', { duration: 3000 });
      return;
    }

    this.apiService.addUser(this.signUpForm.value,
      user => {
        this.user = user as User;
        localStorage.setItem('user', JSON.stringify(user));
        this.dialogRef?.close(true);
      });
  }
}
