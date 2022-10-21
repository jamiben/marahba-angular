import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelDetailGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    root: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const id = +root.url[1].path;
      if(isNaN(id) || id < 0){
        alert('Hotel est inconnu');

        this.router.navigate(['/hotels']);
        return false;
      }
      return true;
  }

}
