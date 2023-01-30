import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {ProductType} from "../../../types/product.type";
import {OrderDataType} from "../../../types/order-data.type";

@Injectable()
export class ProductService {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getProducts(searchString?: string | null | undefined): Observable<ProductType[]> {
    if (searchString) {
      return this.http.get<ProductType[]>(`https://testologia.site/tea?search=${searchString}`);
    }

    return this.http.get<ProductType[]>('https://testologia.site/tea');
  }

  sendOrder(data: OrderDataType): Observable<{ success: boolean, message?: string }> {
    return this.http.post<{ success: boolean, message?: string }>(`https://testologia.site/order-tea`, data);
  }

  setRouterLink(link: string, id?: number): void {
    if (id) {
      this.router.navigate([`${link}/${id}`]);
      return;
    }
    this.router.navigate([link]);
  }
}
