import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import {
  SearchComponent,
  EndComponent,
  MenuComponent,
  TenderingComponent,
  InquiryComponent,
  ListComponent,
  ListSearchComponent,
  ProjectDetailsComponent,
  CountdownComponent,
  ResultComponent,
  NewProjectComponent,
  QuoteManagementComponent,
  SupplierManagementComponent,
  ResultDetailsComponent,
  SupGridComponent,
  QuoGridComponent,
  SearchInfoComponent,
  SettlementManagementComponent,
  ModifyProjectComponent,
  StaffindComponent,
  ContentComponent,
  CarouselComponent,
  PaymentManagementComponent,
} from '.';
import { StaffComponent } from './Staff.component';
import { StaffRoutingModule } from './Staff-routing.module';

@NgModule({
  declarations: [
    StaffComponent,
    SearchComponent,
    EndComponent,
    StaffindComponent,
    ContentComponent,
    CarouselComponent,
    MenuComponent,
    TenderingComponent,
    InquiryComponent,
    ListComponent,
    ListSearchComponent,
    ProjectDetailsComponent,
    CountdownComponent,
    ResultComponent,
    NewProjectComponent,
    QuoteManagementComponent,
    SupplierManagementComponent,
    ResultDetailsComponent,
    SupGridComponent,
    QuoGridComponent,
    SearchInfoComponent,
    SettlementManagementComponent,
    ModifyProjectComponent,
    PaymentManagementComponent,
  ],
  exports: [StaffComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    StaffRoutingModule,
    AgGridModule.withComponents([])
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class StaffModule { }
