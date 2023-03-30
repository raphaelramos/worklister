import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.css']
})
export class SignupComponent implements OnInit {

  form!: FormGroup;
  isLoading = false;
  isError = false;
  loginMsg: string | undefined;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
  
  onSubmit() {
    this.isLoading = true;
    this.isError = false

    this.authService.signup(this.form.value).subscribe({
        next: () => {
          this.authService.loginPage();
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.isError = true;
          console.error(errorResponse);
        }
      }
    );
  }

}
