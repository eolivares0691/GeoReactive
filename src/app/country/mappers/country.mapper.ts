import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      area:restCountry.area,
      capital: restCountry.capital,
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagsvg: restCountry.flags.svg,
      name: restCountry.name.common,
      nativeNameSpa:restCountry.name?.nativeName['spa']?.official ?? 'No spanish official name',
      population: restCountry.population,
      region:restCountry.region,
      spaName:restCountry.translations['spa'].official ?? 'No spanish name',
      subRegion:restCountry.subregion,
    }
  }

  static mapRestCountryToCountryArray(restCountry: RESTCountry[]): Country[]{
    return restCountry.map(this.mapRestCountryToCountry)
  }
}
