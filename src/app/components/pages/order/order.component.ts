import {Component, HostBinding, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs"
import {FormBuilder, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {ProductType} from "../../../types/product.type";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [
    trigger('inOutAnimation', [
        transition(':enter', [
            style({opacity: 0}),
            animate('1.5s ease-out', style({opacity: 1}))
          ]
        ),
        transition(':leave', [
            style({opacity: 1}),
            animate('1s ease-in', style({opacity: 0}))
          ]
        )
      ]
    )
  ]
})
export class OrderComponent implements OnInit, OnDestroy {
  @HostBinding('class') classList = 'flex-grow-1 flex-column d-flex';

  private subscriptionRoute: Subscription | null = null;
  private subscriptionProduct: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;
  isProductNameExist: boolean = true;
  placeOrderError: boolean = false;
  isOrderPlaced: boolean = false;
  submitInProcess: boolean = false;
  private sendErrorTimeout$: Observable<number>;
  private subscriptionSendErrorTimeout: Subscription | null = null;

  orderForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-ЯЁ]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-ЯЁ]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^[\\+]?[0-9]{1,11}$')]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required, Validators.pattern('^[0-9\\-]*$')]],
    address: ['', [Validators.required, Validators.pattern('^[A-Za-zА-ЯЁа-яё0-9\\s\\-\\/]*$')]],
    product: [{value: '', disabled: true}, [Validators.required]],
    comment: ['']
  });

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private productService: ProductService) {
    this.sendErrorTimeout$ = new Observable<number>(() => {
      this.placeOrderError = true;
      const timeout = setTimeout(() => {
        this.placeOrderError = false;
      }, 3000);

      return {
        unsubscribe() {
          clearTimeout(timeout);
        }
      }
    });
  }

  ngOnInit(): void {
    this.subscriptionRoute = this.activatedRoute.queryParams.subscribe(params => {
      if (params['product']) {
        this.orderForm.patchValue({product: params['product']});

        this.subscriptionProduct = this.productService.getProducts().subscribe({
          next: (productsList) => {
            if (params['product']) this.isProductNameExist = this.validateProductName(params['product'], productsList);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionRoute?.unsubscribe();
    this.subscriptionProduct?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
    this.subscriptionSendErrorTimeout?.unsubscribe();
  }

  private validateProductName(productName: string, productList: ProductType[]): boolean {
    return productList.some(product => product.title === productName);
  }

  createOrder(): void {
    this.submitInProcess = true;
    this.subscriptionOrder = this.productService.sendOrder({
      name: this.orderForm.get('firstName')?.value as string,
      last_name: this.orderForm.get('lastName')?.value as string,
      phone: this.orderForm.get('phone')?.value as string,
      country: this.orderForm.get('country')?.value as string,
      zip: this.orderForm.get('zip')?.value as string,
      product: this.orderForm.get('product')?.value as string,
      address: this.orderForm.get('address')?.value as string,
      comment: this.orderForm.get('comment')?.value as string
    })
      .subscribe({
        next: (response) => {
          if (response.success && !response.message) {
            this.isOrderPlaced = true;
          }

          this.placeOrderError = true;
          this.submitInProcess = false;

          if (response.message) {
            this.subscriptionSendErrorTimeout = this.sendErrorTimeout$.subscribe();
            console.log(response.message);
          }
        },
        error: (error) => {
          console.log(error);
          this.subscriptionSendErrorTimeout = this.sendErrorTimeout$.subscribe();
          this.submitInProcess = false;
        }
      });
  }
}
