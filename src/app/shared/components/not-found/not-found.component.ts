import { Location } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';

@Component({
  selector: 'not-found',
  imports: [],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  errorMessage = input.required<string|unknown|null>();
  location = inject(Location);

  goBack(){
    this.location.back();
  }
 }
