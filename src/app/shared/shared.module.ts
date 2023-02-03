import {Component, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";

const componentsArr = [
  FooterComponent,
  HeaderComponent,
  ProductCardComponent
];

@NgModule({
  declarations: [
    ...componentsArr
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule
  ],
  exports: [
    ...componentsArr
  ]
})
export class SharedModule {
}
