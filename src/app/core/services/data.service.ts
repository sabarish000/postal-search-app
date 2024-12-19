import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PostalAddress } from '../models/postal-address';
import { City } from '../models/city';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly BASE_URI = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  public getCitiesByName(name: string): Observable<City[]> {
    return this.http.get<City[]>(
      `${this.BASE_URI}/city/search?search_text=${name}`
    );
  }

  public getAddresesByName(
    cityCode: string,
    searchText: string
  ): Observable<PostalAddress[]> {
    return this.http.get<PostalAddress[]>(
      `${this.BASE_URI}/address/search/by-city-and-address?city_code=${cityCode}&search_text=${searchText}`
    );
  }

  public getCityAreas(city: string): Observable<string[]> {
    return this.getAddresesByName(city, '').pipe(
      map((resp) => resp.map((address) => address.street))
    );
  }

  public getAddressesByPostcode(code: string): Observable<PostalAddress[]> {
    return this.http.get<PostalAddress[]>(
      `${this.BASE_URI}/address/search/by-postal-code?postal_code=${code}`
    );
  }
}
