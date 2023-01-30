import {Component, HostBinding, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @HostBinding('class') class = 'flex-grow-1';
  product: ProductType;
  private subscription: Subscription | null = null;

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }

  ngOnInit(): void {
    this.subscription = this.productService.getProducts()
      .subscribe({
        next: (data) => {
          this.activatedRoute.params.subscribe(params => {
            this.product = data[params['id'] - 1];
          });
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/']);
        }
      });
  }
}
