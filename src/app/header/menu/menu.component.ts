import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiClientService } from 'src/app/api-client.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems = [{title: "test", url:"url"}, {title: "test2", url:"url2"}]
  loggedIn = false;
  isAdmin = false;
  private loginSubscription: Subscription;
  private adminSubscription: Subscription;
  constructor(private apiClient: ApiClientService) { }

  ngOnInit(): void {
    this.loginSubscription = this.apiClient
      .isLoggedInObservable
      .subscribe(newState => this.loggedIn = newState);
    this.adminSubscription = this.apiClient
      .isAdminObservable
      .subscribe(newState => this.isAdmin = newState);
  }

  ngOnDestroy() : void {
    this.loginSubscription.unsubscribe();
    this.adminSubscription.unsubscribe();
  }
}
