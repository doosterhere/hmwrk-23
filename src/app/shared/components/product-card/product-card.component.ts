import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'product-card-component',
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input() product: ProductType;

  constructor(private router: Router,
              private productService: ProductService) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }

  goByLink(link: string, id: number): void {
    this.productService.setRouterLink(link, id);
  }
}
