import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import {
  ToolbarComponent,
  QueryModalComponent,
  FindModalComponent,
  FindusermodalComponent,
  RoutineGridComponent
} from './components';

@NgModule({
  declarations: [
    ToolbarComponent,
    QueryModalComponent,
    FindModalComponent,
    FindusermodalComponent,
    RoutineGridComponent,
  ],
  // 导入模块/组件
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    AgGridModule.withComponents([]),
  ],
  // 导出可以是组件/模块
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    AgGridModule,
    ToolbarComponent,
    QueryModalComponent,
    FindModalComponent,
    RoutineGridComponent,
  ]
})
export class SharedModule { }
