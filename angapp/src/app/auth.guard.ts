import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './services/auth.service' ;
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authservice: AuthService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if(this.authservice.loggedIn()) {
      return true
    } else{
      this.router.navigate(['/Login'])
      return false
    }
}

}