import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../shared/services/product.service";
import {SearchService} from "../../shared/services/search.service";

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'flex-grow-1';
  private subscriptionAll: Subscription | null = null;
  private subscriptionSearch: Subscription | null = null;
  products: ProductType[] = [];
  loading: boolean = false;
  searchPhrase: string | null | undefined = null;

  constructor(private productService: ProductService,
              private router: Router,
              private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.loading = true;

    this.subscriptionSearch = this.searchService.searchString$.subscribe(phrase => {
      this.searchPhrase = phrase;

      this.subscriptionAll = this.productService.getProducts(phrase).subscribe({
        next: (productsList) => {
          this.products = Object.values(productsList);
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/']);
        }
      });
    });

    this.searchService.searchString$.next(this.searchService.searchString);
  }

  ngOnDestroy(): void {
    this.subscriptionAll?.unsubscribe();
    this.subscriptionSearch?.unsubscribe();
  }
}
