import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from "./main.component";
import {NgbAccordion, NgbPanel, NgbPanelContent} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    MainComponent
  ],
    imports: [
        CommonModule,
        NgbAccordion,
        NgbPanel,
        NgbPanelContent
    ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
