import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { TodoService } from './todo.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AddDialogModule } from './add-dialog/add-dialog.module';
import { DeleteDialogModule } from 'src/app/shared/delete-dialog/delete-dialog.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: HomeComponent }
        ]),
        MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule,
        AddDialogModule, DeleteDialogModule
    ],
    providers: [TodoService]
})
export class HomeModule { }
