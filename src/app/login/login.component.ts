import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  constructor(private apiClient: ApiClientService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.apiClient
      .login({username: this.username, password: this.password})
      .then(success => {
        if (success) {
          this.router.navigate(["home"]);
        }
      });
  }
}
