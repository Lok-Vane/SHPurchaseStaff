import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  StaffindComponent,
  TenderingComponent,
  ResultComponent,
  NewProjectComponent,
  ModifyProjectComponent,
  QuoteManagementComponent,
  SettlementManagementComponent,
  SupplierManagementComponent,
  ProjectDetailsComponent,
  ResultDetailsComponent,
  SearchInfoComponent,
  PaymentManagementComponent
} from '.';


const routes: Routes = [
  { path: 'index', component: StaffindComponent },
  { path: 'tendering', component: TenderingComponent },
  { path: 'result', component: ResultComponent },
  { path: 'new/project', component: NewProjectComponent },
  { path: 'modify/project/:bizId', component: ModifyProjectComponent },
  { path: 'manage/quote', component: QuoteManagementComponent },
  { path: 'manage/settlement', component: SettlementManagementComponent },
  { path: 'manage/payment', component: PaymentManagementComponent },
  { path: 'manage/supplier', component: SupplierManagementComponent },
  { path: 'project/info/:bizId', component: ProjectDetailsComponent },
  { path: 'result/info/:bizId', component: ResultDetailsComponent },
  { path: 'search/:key', component: SearchInfoComponent },
  { path: '**', redirectTo: 'index' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
