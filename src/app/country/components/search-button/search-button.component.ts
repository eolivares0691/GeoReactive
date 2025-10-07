import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';
import { Region } from '../../interfaces/country.interface';
import { TitleCasePipe } from '@angular/common';



@Component({
  selector: 'country-search-button',
  imports: [TitleCasePipe],
  templateUrl: './search-button.component.html',
})
export class SearchButtonComponent {

  searchValueRegion = output<Region >();


  selectedRegion = linkedSignal<Region  >(() => this.initialValue()!)

  public regions: Region[] = [
    'africa',
    'americas',
    'asia',
    'europe',
    'oceania',
  ];

  initialValue = input<Region>();

  debounceEffect = effect((onCleanUp) => {
    const value = this.selectedRegion();
    const value2 = this.initialValue();
    console.log("value2", value2);
    const timeout = setTimeout(() => {
      this.searchValueRegion.emit(value);
    }, 300);
    onCleanUp(() => {
      clearTimeout(timeout);
    });

  })







}
