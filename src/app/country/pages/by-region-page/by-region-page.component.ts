import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { ListComponent } from "../../components/list/list.component";
import { SearchButtonComponent } from '../../components/search-button/search-button.component';
import { Region } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';



function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLocaleLowerCase();
  const validRegions: Record<string, Region> = {
    africa: 'africa',
    americas: 'americas',
    asia: 'asia',
    europe: 'europe',
    oceania: 'oceania',
  }
  return validRegions[queryParam] ?? validRegions['americas']
}

@Component({
  selector: 'by-region-page',
  imports: [ListComponent, SearchButtonComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);
  activatedRouted = inject(ActivatedRoute);
  router = inject(Router)
  queryParam = this.activatedRouted.snapshot.queryParamMap.get('region') ?? '';
  query = linkedSignal<Region>(() => validateQueryParam(this.queryParam));

  countrybyRegionResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.query,
        }
      })
      return this.countryService.searchByRegion(request.query)
    }
  })




}
