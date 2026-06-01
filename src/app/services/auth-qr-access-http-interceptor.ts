import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpContextToken, HttpContext, HttpResponse } from '@angular/common/http';
import { catchError, switchMap, from, of } from 'rxjs';
import { AuthUser } from '../api-service/auth-user';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


const AUTHQRTOKEN_REQUIRED_TOKEN= new HttpContextToken<boolean>(() => false);
export const AddAuthQRTokenHttpIntercept= new HttpContext().set(AUTHQRTOKEN_REQUIRED_TOKEN, true)


export const authQrAccessHttpInterceptor: HttpInterceptorFn = (req, next) => {
  if(!req.context.get(AUTHQRTOKEN_REQUIRED_TOKEN)){ return next(req); }

  const authUserService: AuthUser= inject(AuthUser);
  const router: Router= inject(Router);
  const httpHeaderAuth= (request: HttpRequest<unknown>)=> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${authUserService.getTokenAccessQRAccount()?.access}`
      }
    });
  };
  /* 1st try */
  return next(httpHeaderAuth(req)).pipe(
    catchError((error: HttpErrorResponse)=> {
      if( error.status==401 ){

        return from(authUserService.refreshAccessQRTokenOnCookieAsync()).pipe(
          switchMap((success)=> {
            if(success){
              /* 2nd try */
              return next(httpHeaderAuth(req));
            }

            authUserService.deleteTokenAccessQRAccount();
            router.navigate(['/verify-to-register']);
            return of(new HttpResponse({
              status: 200,
              body: null
            }));
          }),
          catchError((refreshErr)=> {
            authUserService.deleteTokenAccessQRAccount();
            router.navigate(['/verify-to-register']);
            return of(new HttpResponse({
              status: 200,
              body: null
            }));
          })
        );

      }
      return of(new HttpResponse({
        status: 200,
        body: null
      }));
    })
  );
};
