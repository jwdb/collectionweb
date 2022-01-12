import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems = [{title: "test", url:"url"}, {title: "test2", url:"url2"}]
  loggedIn = true;
  constructor() { }

  ngOnInit(): void {
  }

}
