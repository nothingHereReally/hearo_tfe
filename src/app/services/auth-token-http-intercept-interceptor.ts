import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpContextToken } from '@angular/common/http';
import { catchError, switchMap, throwError, from } from 'rxjs';
import { AuthUser } from '../api-service/auth-user';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const IS_AUTHTOKEN_REQUIRED= new HttpContextToken<boolean>(() => false);


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
  if(!req.context.get(IS_AUTHTOKEN_REQUIRED)){ return next(req); }

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

        return from(authUserService.refreshAuthUserTokenOnCookieAsync()).pipe(
          switchMap((success)=> {
            if(success){
              /* 2nd try */
              return next(httpHeaderAuth(req));
            }
            router.navigate(['/login']);
            return throwError(()=> error);
          }),
          catchError((refreshErr)=> {
            router.navigate(['/login']);
            return throwError(()=> refreshErr);
          })
        );

    })
  );
};
