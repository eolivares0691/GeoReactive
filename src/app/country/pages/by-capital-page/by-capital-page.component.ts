import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);
  activatedRouted = inject(ActivatedRoute);
  router = inject(Router)
  queryParam = this.activatedRouted.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);
  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) return [];
      this.router.navigate(['/country/by-capital'],{
        queryParams:{
          query: request.query,
        }
      })
      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      );
    }
  })



}


