import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/app/auth/interfaces/user.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<User>(`${environment.apiUrl}/user`).subscribe(data => {
      this.user = data;
    });
  }

}
