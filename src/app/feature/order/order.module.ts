import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderComponent} from "./order.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    OrderComponent
  ]
})
export class OrderModule {
}
