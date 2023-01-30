import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ProductCardComponent
  ]
})
export class SharedModule {
}
