import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { ApiService } from './../../../../services';
import { Shoe } from './../../../../models';

@Component({
  selector: 'app-shoe-form',
  templateUrl: './shoe-form.component.html',
  styleUrls: ['./shoe-form.component.scss']
})
export class ShoeFormComponent implements OnInit {
  @Input() action: string = '';
  @Input() shoe: Shoe = new Shoe();
  public title: string = '';
  public view: boolean = false;
  public add: boolean = false;
  public update: boolean = false;
  public delete: boolean = false;
  public shoeForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ShoeFormComponent>,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private resultBar: MatSnackBar
  ) {
    this.shoeForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0.0, Validators.required],
      color: ['', Validators.required],
      season: [2023, Validators.required],
      type: ['', Validators.required],
      drawing: ['', Validators.required],
      composition: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  ngOnInit() {
    switch(this.action) {
      case 'view': this.title = (this.shoe) ? this.shoe.name : 'View'; this.view = true; break;
      case 'add': this.title = 'Add'; this.add = true; break;
      case 'update': this.title = 'Update'; this.update = true; break;
      case 'delete': this.title = 'Delete'; this.delete = true; break;
    }

    if(this.shoe) {
      this.shoeForm = this.formBuilder.group({
        _id: [{value: this.shoe._id, disabled: this.delete}, Validators.required],
        name: [{value: this.shoe.name, disabled: this.delete}, Validators.required],
        price: [{value: this.shoe.price, disabled: this.delete}, Validators.required],
        color: [{value: this.shoe.color, disabled: this.delete}, Validators.required],
        season: [{value: this.shoe.season, disabled: this.delete}, Validators.required],
        type: [{value: this.shoe.type, disabled: this.delete}, Validators.required],
        drawing: [{value: this.shoe.drawing, disabled: this.delete}, Validators.required],
        composition: [{value: this.shoe.composition, disabled: this.delete}, Validators.required],
        image: [{value: this.shoe.image, disabled: this.delete}, Validators.required]
      })
    }
  }

  public submit() {
    if(this.add) {
      this.addShoe();
      return;
    }

    if(this.update) {
      this.updateShoe();
      return;
    }

    if(this.delete) {
      this.deleteShoe();
      return;
    }
  }

  public addShoe() {
    if(!this.shoeForm.valid) return;

    this.apiService.addShoe(this.shoeForm.value,
      shoe => {
        this.shoe = shoe as Shoe;
        this.dialogRef?.close(true);
      }
    );
  }

  public updateShoe() {
    if(!this.shoeForm.valid) return;

    this.apiService.updateShoe(this.shoeForm.value,
      shoe => {
        this.shoe = shoe as Shoe;
        this.dialogRef?.close(true);
      }
    );
  }

  public deleteShoe() {
    this.apiService.deleteShoe(this.shoeForm.value, () => this.dialogRef?.close(true));
  }
}
