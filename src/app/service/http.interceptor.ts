import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { LoaderService } from "./loader.service";
import { UserService } from './user.service';
  
// Handle API ALL Calls reponses
@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService, private userService: UserService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.loaderService.show();

      const token = localStorage.getItem('token') || '';
      //const clonedRequest = req.clone({ headers: req.headers.set('token', token) });
      const clonedRequest = req.clone({ setHeaders: { token } });
      //const clonedRequest = req.clone({ setHeaders: {Authorization: `Authorization token ${token}`} });
      //const clonedRequest = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      return next.handle(clonedRequest).pipe(finalize(() => this.loaderService.hide()),
        catchError((error, caught) => {
          //intercept the respons error
          if (error)
            this.handleAuthError(error);
          return of(error);
        })
      );
    }

    /**
     * manage errors
     * @param err
     * @returns {any}
     */
    private handleAuthError(err: HttpErrorResponse): Observable<any> {
      //handle your auth error or rethrow
      if (err.status === 401) {
        //navigate /delete cookies or whatever
        console.log('handled error ' + err.status);
        this.userService.logoutUser();
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return of(err.message);
      }
      this.loaderService.hide();
      return of(true);
    }
}
  
