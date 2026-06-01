import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpContextToken, HttpContext, HttpResponse } from '@angular/common/http';
import { catchError, switchMap, from, of } from 'rxjs';
import { AuthUser } from '../api-service/auth-user';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


const AUTHTOKEN_REQUIRED_TOKEN= new HttpContextToken<boolean>(() => false);
export const AddAuthTokenHttpIntercept= new HttpContext().set(AUTHTOKEN_REQUIRED_TOKEN, true)


/**
 * http intercept for auth token
 * access/refresh token
 *
 * this.getAccountToken()
 * -- getting token via cookie
 * -- String(this.getAccountToken().access)
 * -- String(this.getAccountToken().refresh)
 *
 * this.refreshAuthUserTokenOnCookieAsync()
 * -- an async function that ruturns true if success updating token
 * -- else false, refresh token expired
 * ---- depends on this.getTokenViaRefreshHttpPost()
 * ---- depends on this.getAccountToken()
 */
/* public authInterceptor(req: HttpRequest<unknown>, next: any): HttpInterceptorFn{...} */
export const authTokenHttpInterceptInterceptor: HttpInterceptorFn= (req, next)=> {
  if(!req.context.get(AUTHTOKEN_REQUIRED_TOKEN)){ return next(req); }

  const authUserService: AuthUser= inject(AuthUser);
  const router: Router= inject(Router);
  const httpHeaderAuth= (request: HttpRequest<unknown>)=> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${authUserService.getAccountToken()?.access}`
      }
    });
  };
  /* 1st try */
  return next(httpHeaderAuth(req)).pipe(
    catchError((error: HttpErrorResponse)=> {
      if( error.status==401 ){

        return from(authUserService.refreshAuthUserTokenOnCookieAsync()).pipe(
          switchMap((success)=> {
            if(success){
              /* 2nd try */
              return next(httpHeaderAuth(req));
            }

            authUserService.deleteAccountToken();
            router.navigate(['/login']);
            return of(new HttpResponse({
              status: 200,
              body: null
            }));
          }),
          catchError((refreshErr)=> {
            authUserService.deleteAccountToken();
            router.navigate(['/login']);
            return of(new HttpResponse({
              status: 200,
              body: null
            }));
          })
        );

      }else if( error.status==404 ){
        return of(new HttpResponse({
          status: 404,
          body: null
        }));
      }
      return of(new HttpResponse({
        status: 200,
        body: null
      }));
    })
  );
};
