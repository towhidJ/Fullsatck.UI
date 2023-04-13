import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private service: UserService, private route: Router) {}
  canActivate() {
    if (this.service.HaveAccess()) {
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
