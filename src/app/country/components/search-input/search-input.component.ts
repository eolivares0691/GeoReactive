import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  searchValue = output<string>();
  placeholderSearch = input.required<string>();
  debounceTime = input(300);
  initialValue = input<string>('');
  inputValue = linkedSignal<string> (()=> this.initialValue( ) ?? '');



  debounceEffect = effect((onCleanUp) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.searchValue.emit(value);
    }, this.debounceTime());
    onCleanUp(() => {
      clearTimeout(timeout);
    });

  })






}
