import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  isLoading = false;
  isError = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    if (this.route.snapshot.params['redirect']) {
      return this.authService.redirect();
    }
  }
  
  onSubmit() {
    this.isLoading = true;
    this.isError = false;

    this.authService.login(this.form.value).subscribe(
      {
        error: () => {
          this.isLoading = false;
          this.isError = true;
        }
      }
    );
  }

}
