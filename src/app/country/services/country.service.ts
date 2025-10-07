import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country, Region } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region|string, Country[]>();


  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    console.log(`emitiondo valor ${query}`);
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query)!);
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`, {
    }).pipe(
      map((items) => CountryMapper.mapRestCountryToCountryArray(items)),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      catchError((error: any) => {
        console.log(error);
        return throwError(() => new Error(`No se pudo obtener paises con  ${query}`))
      })
    )
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    console.log(`emitiendo valor ${query} desde searchByCountry`);
    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []).pipe(delay(2000));
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`, {
    }).pipe(
      map((items) => CountryMapper.mapRestCountryToCountryArray(items)),
      tap(countries => this.queryCacheCountry.set(query, countries)),
      delay(2000),
      catchError((error: any) => {
        console.log(error);
        return throwError(() => new Error(`No se pudo obtener paises con el nombre de  ${query}`))
      })
    )
  }

  searchByAlphaCode(code: string): Observable<Country | undefined> {
    const url = `${API_URL}/alpha/${code}`

    return this.http.get<RESTCountry[]>(url, {
    }).pipe(
      map((items) => CountryMapper.mapRestCountryToCountryArray(items)),
      map(countries => countries.at(0)),
      catchError((error: any) => {
        console.log(error);
        return throwError(() => new Error(`No se pudo obtener país con el código ${code}`))
      })
    )
  }


  searchByRegion(region: string): Observable<Country[]> {
    console.log(`emitiendo valor ${region} desde searchByRegion`);
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`, {
    }).pipe(
      map((items) => CountryMapper.mapRestCountryToCountryArray(items)),
      tap(countries => this.queryCacheRegion.set(region, countries)),
      catchError((error: any) => {
        console.log(error);
        return throwError(() => new Error(`No se pudo obtener paises con la region ${region}`))
      })
    )
  }


}
