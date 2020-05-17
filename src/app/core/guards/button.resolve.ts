import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { ManageSettingService } from '../config';
import { DaoService } from '../service';
import { Injectable } from '@angular/core';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ButtonResolve implements Resolve<any> {

    constructor(
        private router: Router,
        private daoApi: DaoService,
        public managesetApi: ManageSettingService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
        const pageId: string = route.data.pageId;

        return this.daoApi.doPostRequest(this.managesetApi.buttonasgntouser, pageId)
            .pipe(
                take(1),
                mergeMap((buttonCategorys: any) => {
                    if (buttonCategorys) {
                        return of(buttonCategorys.data);
                    } else { // id not found
                        return EMPTY;
                    }
                })
            );
    }
}
