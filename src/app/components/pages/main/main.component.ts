import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'flex-grow-1';
  showModal: boolean = false;
  private observable: Observable<number>;
  private subscription: Subscription | null = null;

  constructor(private productService: ProductService) {
    this.observable = new Observable<number>((observer) => {
      const timeout = setTimeout(() => {
        observer.complete();
      }, 10000);

      return {
        unsubscribe() {
          clearTimeout(timeout);
        }
      }
    });
  }

  ngOnInit(): void {
    this.subscription = this.observable.subscribe({
        complete: () => {
          this.showModal = true;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  closeModal(): void {
    this.showModal = false;
  }

  goByLink(link: string): void {
    this.productService.setRouterLink(link);
  }
}
