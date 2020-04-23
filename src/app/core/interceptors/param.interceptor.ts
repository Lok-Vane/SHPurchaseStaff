import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
// import { SHPurchaseSettinggService } from '..';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {

    // constructor(public SHPurchase: SHPurchaseSettinggService) { }

    // options = {
    //     store_key: '_token',
    //     token_invalid_redirect: true,
    //     token_exp_offset: 10,
    //     token_send_key: 'token',
    //     token_send_template: '${token}',
    //     token_send_place: 'header',
    //     login_url: `/login/signin`,
    //     ignores: [
    //         /passport\/login/,
    //         /register\//,
    //         /forgotpwd\//,
    //         /user\/modifiedpwd/,
    //         /orggroup\/selectlist/,
    //         /organize\/selectlist/,
    //         /assets\//],
    //     allow_anonymous_key: `_allow_anonymous`
    // };

    // intercept(req: HttpRequest<any>, next: HttpHandler) {
    //     // 获取当前url
    //     // let url = req.url;
    //     // 获取token
    //     const logininfo: any = sessionStorage.getItem('token');
    //     if (logininfo != null && logininfo.length > 0) {
    //         // 克隆请求头并附加Token
    //         const tokeninfo = JSON.parse(logininfo);
    //         const modifiedReq = req.clone({
    //             setHeaders: { Authorization: `Bearer ${tokeninfo.token}` }
    //         });
    //         return next.handle(modifiedReq);
    //     } else {
    //         return next.handle(req);
    //     }
    // }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // 获取当前url
        // let url = req.url;
        // 获取token
        // console.log(req);

        let logininfo: any;
        // if (req.urlWithParams === this.SHPurchase.OrgSearch) {
        logininfo = '77f1753bbbbd4366ada57d6988444db3';
        // } else {
        //     logininfo = sessionStorage.getItem('token');
        // }
        if (logininfo !== null && logininfo.length > 0) {
            // 克隆请求头并附加Token
            // const tokeninfo = JSON.parse(logininfo);
            const modifiedReq = req.clone({
                setHeaders: { Authorization: `${logininfo}` }
            });
            return next.handle(modifiedReq);
        } else {
            return next.handle(req);
        }
    }
}
