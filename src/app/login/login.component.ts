import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  public errorText: string = "";
  public hasError: boolean = false;
  constructor(
    private apiClient: ApiClientService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path == "logout") {
      this.apiClient.deleteTokenData();
    }
  }

  login(): void {
    this.hasError = false;
    this.errorText = "";
    
    this.apiClient
      .login({username: this.username, password: this.password})
      .then(
        success => {
          if (success) {
            this.router.navigate(["home"]);
          } else {
            this.hasError = true;
            this.errorText = "Login failure";
          }
        }, rejected => {
          this.hasError = true;
          this.errorText = `Login failure (${rejected.status})`;
        }
      );
  }
}
