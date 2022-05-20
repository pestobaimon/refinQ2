import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResCategories } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DataFetchService {
  constructor(private http: HttpClient) {}

  getData(): Observable<IResCategories> {
    return this.http.get<IResCategories>(
      'https://api.publicapis.org/categories'
    );
  }
}
