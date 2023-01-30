import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'header-comp',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  searchForm = this.fb.group({
    search: ['']
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private searchService: SearchService) {
  }

  search(): void {
    const expression: string | null | undefined = this.searchForm.get('search')?.value;
    this.searchService.setSearchPhrase(expression);
    this.router.navigate(['catalog']);
  }

  clear(): void {
    this.searchForm.reset();
    this.searchService.setSearchPhrase(null);

    if (this.router.url === '/catalog') {
      this.router.navigate(['catalog']);
    }
  }
}
