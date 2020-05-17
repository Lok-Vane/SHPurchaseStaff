import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild {
    /**
     * 构造函数
     */
    constructor(
        private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        const loggedinfo = '77f1753bbbbd4366ada57d6988444db3';

        if (loggedinfo) {
            return true;
        } else {
            this.router.navigateByUrl('/passport/login');
        }
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const loggedinfo = '77f1753bbbbd4366ada57d6988444db3';

        if (loggedinfo) {
            return true;
        } else {
            this.router.navigateByUrl('/passport/login');
        }
    }
}
