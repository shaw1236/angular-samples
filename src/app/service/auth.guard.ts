import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "./user.service";

// Auth Gauard Service for User Role Check wheather User having access for Particular Routes
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if (route.data["debug"])
      return true;
      
    // if user is not logged in redirect right away
    if (!this.userService.isAuthorised()){
      this.router.navigate(['/Login']);
      return false;
    }

    // What the user needs to be to access the page
    const roles = route.data["roles"] as Array<string>;
    if (!roles) {
      this.router.navigate(['/Login']);
      return false;
    }

    const found = roles.indexOf(this.userService.getUser()?.role);
    // No access role found? redirect to Home Page
    if (found < 0) {
      this.router.navigate(['/Login']);
      return false;
    }
    return true;
  }
}
