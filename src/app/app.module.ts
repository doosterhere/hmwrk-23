import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/common/header/header.component';
import {MainComponent} from './components/pages/main/main.component';
import {FooterComponent} from './components/common/footer/footer.component';
import {CatalogComponent} from './components/pages/catalog/catalog.component';
import {ProductComponent} from './components/pages/product/product.component';
import {OrderComponent} from './components/pages/order/order.component';
import {ProductCardComponent} from './components/common/product-card/product-card.component';
import {ProductService} from "./services/product.service";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    CatalogComponent,
    ProductComponent,
    OrderComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
