import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductComponent} from "./product.component";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [
    ProductComponent
  ]
})
export class ProductModule { }
