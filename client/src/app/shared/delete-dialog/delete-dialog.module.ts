import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DeleteDialogComponent } from './delete-dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [DeleteDialogComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule
    ],
    entryComponents: [DeleteDialogComponent],
    exports: [DeleteDialogComponent]
})

export class DeleteDialogModule { }
