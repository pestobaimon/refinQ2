import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, merge } from 'rxjs';
import { map, mergeMap, startWith, switchMap, take } from 'rxjs/operators';
import { DataFetchService } from './core/services/data-fetch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'refin-q2';

  filteredCategories$: Observable<string[]>;
  // categories$: Observable<string[]>;
  filter = new FormControl('');

  constructor(private dataFetchService: DataFetchService) {
    this.filteredCategories$ = this.dataFetchService.getData().pipe(
      take(1),
      switchMap((data) => {
        console.log('data consumed');
        return this.filter.valueChanges.pipe(
          startWith(''),
          map((text) => this.search(data.categories, text))
        );
      })
    );
  }

  search(categories: string[], text: string): string[] {
    return categories.filter((category) => {
      const term = text.toLowerCase();
      return category.toLowerCase().includes(term);
    });
  }
}
