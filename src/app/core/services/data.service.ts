import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { areas, cities } from './mock-data';
import { Observable, of } from 'rxjs';
import { PostalAddress } from '../models/postal-address';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getCitiesByName(name: string): Observable<City[]> {
    return of(cities);
  }

  public getAreasByName(city: string, name: string): Observable<PostalAddress[]> {
    console.log(`getAreasByName: ${city}, ${name}`);
    return of(areas.filter(a => a.city === city && a.street.toLowerCase().includes(name)));
  }

  public getCityAreas(city: string): Observable<string[]> {
    return of(areas.map(val => val.street));
  }

  public getAreasByCode(code: string): Observable<PostalAddress[]> {
    return of(areas.filter(a => a.postalCode?.toString().includes(code)));
  }
}
