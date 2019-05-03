import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor(public http: HttpClient, private toastr: ToastrService) {
  }
 private url = 'http://api.openweathermap.org/data/2.5/forecast';
 private appId = 'e24e9f073ed741c5a8dfc2f79c612509';




public getAllIsps(city): Observable<any> {
  return this.http.get(`${this.url}?q=${city}&units=metric&APPID=${this.appId}`);
}




}
