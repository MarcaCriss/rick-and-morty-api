import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

import { HttpInterceptor } from '../interfaces/interceptor.interface';

@Injectable({ providedIn: 'root' })
export class CacheInterceptor implements HttpInterceptor {

  private cache: Map<HttpRequest<any>, HttpResponse<any>> = new Map();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.method !== "GET") {
        return next.handle(req)
    }
    if(req.headers.get("reset")) {
        this.cache.delete(req)
    }
    const cachedResponse: HttpResponse<any> | undefined = this.cache.get(req)
    if(cachedResponse) {
        return of(cachedResponse.clone());
    }else {
        return next.handle(req).pipe(
            tap(stateEvent => {
                if(stateEvent instanceof HttpResponse) {
                    this.cache.set(req, stateEvent.clone())
                }
            })
        );
    }
  }

}