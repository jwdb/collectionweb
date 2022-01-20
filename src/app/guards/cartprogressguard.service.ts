import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Shoppingcart } from '../shoppingcart/shoppingcart.model';
import { ShoppingcartService } from '../shoppingcart/shoppingcart.service';

@Injectable({
  providedIn: 'root'
})
export class CartprogressguardService implements CanActivate {

  constructor(
    public router: Router,
    public shoppingCartService: ShoppingcartService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentCart: Shoppingcart = this.shoppingCartService.getCart();
    const currentRoute = route.routeConfig?.path;
    console.log(currentRoute);
    console.log(currentCart);
    if (currentCart == null || currentCart.items.length <= 0)
    {
      this.router.navigate(['cart']);
      return false;
    }
    if ((currentRoute == "cart/payment" && !currentCart.isAddressFufilled())
        || currentRoute == "cart/success" && !currentCart.isAddressFufilled()) {
      this.router.navigate(['cart','address']);
      return false;
    } else if (
      currentRoute == "cart/success"
       && currentCart.isAddressFufilled()
       && !currentCart.isPaid) {
      this.router.navigate(['cart','payment']);
      return false;
    }

    return true;
  }

}
