import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from './todo.service';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { Todo } from './todo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  list!: Todo[];

  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,
    private matSnackBar: MatSnackBar) {}
  
  ngOnInit() {
    this.getList();
  }


  getList() {
    this.todoService.get()
    .subscribe(data => {
      this.list = data;
    });
  }

  addItem() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.post(result)
        .subscribe(
          () => {
            this.getList();
            this.matSnackBar.open('item added', '', {
              duration: 2500,
            });
        });
      }
    });
  }

  deleteItem(id: any, name: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: { name: name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmed') {
        this.todoService.delete(id)
        .subscribe(
          () => {
            this.getList();
            this.matSnackBar.open('item deleted', '', {
              duration: 2500,
            });
        });
      }
    });
  }
}
