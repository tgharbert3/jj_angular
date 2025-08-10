import { Component } from '@angular/core';
import { flush } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-post',
  imports: [MatDialogModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  matDialogRef!: MatDialogRef<AddPostComponent>;

  constructor(private dialogRef: MatDialogRef<AddPostComponent>) { }

  CloseModal() {
    this.dialogRef.close(false);
  };
}
