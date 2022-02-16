import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  serverUrl = 'http://localhost:3000';
  result: any;

  constructor(private http: HttpClient) { }

  getRegion(): Observable<any> {
      return this.http.get<any>(this.serverUrl + '/master/countries');
  }

  getProvince(data): Observable<any> {
    return this.http.get<any>(this.serverUrl + '/master/states/'+data);
  }

  getCities(data): Observable<any> {
    return this.http.get<any>(this.serverUrl + '/master/cities/'+data);
  }


  getProvinceId(data): Observable<any> {
    return this.http.get<any>(this.serverUrl + '/master/states-obj-id/'+data);
  }

  getCitiesId(data): Observable<any> {
    return this.http.get<any>(this.serverUrl + '/master/cities-obj-id/'+data);
  }

  submitVisitor(data): Observable<any> {
    return this.http.post<any>(this.serverUrl + '/visitor/store',data);
  }

  listVisitor(perPage, page): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/visitor/byPage/${perPage}/${page}`);
  }

  getQueueVisitor(perPage, page): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/queue/index/${perPage}/${page}`);
  }

  addQueueVisitor(id): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/queue/add/${id}`);
  }

  detailQueueVisitor(id_barcode): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/queue/detail/${id_barcode}`);
  }

  lastQueue(): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/queue/last`);
  }

  searchVisitor(data): Observable<any> {
    return this.http.post<any>(this.serverUrl + '/visitor/search',data);
  }

  detailVisitor(id): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/visitor/detail/${id}`);
  }

  updateVisitor(data): Observable<any> {
    return this.http.post<any>(this.serverUrl + '/visitor/update',data);
  }

}
