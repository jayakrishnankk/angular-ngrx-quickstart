import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Widget } from './widget.model';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/widgets/';
const HEADER = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({providedIn: 'root'})
export class WidgetsService {
  constructor(private http: HttpClient) {
  }

  all(): Observable<Widget[]> {
    return this.http.get<Widget[]>(BASE_URL);
  }

  load(id) {
    return this.http.get(`${BASE_URL}${id}`);
  }

  create(widget: Widget) {
    return this.http.post(`${BASE_URL}`, JSON.stringify(widget), HEADER);
  }

  update(widget: Widget) {
    return this.http.patch(`${BASE_URL}${widget.id}`, JSON.stringify(widget), HEADER);
  }

  delete(widget: Widget) {
    return this.http.delete(`${BASE_URL}${widget.id}`);
  }

  search(term: string) {
    const params = new HttpParams();
    params.set('q', term);

    return this.http.get(`${BASE_URL}`, {params});
  }
}
