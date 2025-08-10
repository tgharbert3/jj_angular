import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-blog',
  imports: [MatDialogModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  matDialogRef!: MatDialogRef<AddPostComponent>;

  constructor(private matDialog: MatDialog) { }

  OpenModal() {
    this.matDialogRef = this.matDialog.open(AddPostComponent, {
      height: '50%',
      maxHeight: '90vh',
      width: '95%',
      maxWidth: '600px',
      disableClose: true,
    });

    this.matDialogRef.afterClosed().subscribe(res => {
      console.log('Dialog closed with result:', res);
    });
  };
};
