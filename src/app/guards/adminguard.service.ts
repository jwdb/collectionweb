import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardService implements CanActivate, CanActivateChild {

  constructor(
    private apiClient: ApiClientService, 
    public router: Router) { }

  canActivate(): boolean {
    if (!this.apiClient.isLoggedIn() || !this.apiClient.isAdmin()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  
  canActivateChild(): boolean {
    return this.canActivate();
  }
}
