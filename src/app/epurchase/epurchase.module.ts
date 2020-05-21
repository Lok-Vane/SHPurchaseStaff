import { NgModule } from '@angular/core';
import { EPurchaseRoutingModule } from './epurchase-routing.module';
import { SharedModule } from '../shared';
import {
    EpuFirCategoryMixComponent,
    EpuFirCategoryQueryComponent,
    EpuSecCategoryMixComponent,
    EpuSecCategoryQueryComponent,
    EpuPaymentModeMixComponent,
    EpuPaymentModeQueryComponent,
    EpuSettlementModeMixComponent,
    EpuSettlementModeQueryComponent,
    EpuSupplierMixComponent,
    EpuSupplierQueryComponent,
    EpuMaterialMixComponent,
    EpuMaterialQueryComponent,
    EpuReSupplyListComponent,
    EpuReSupplyDetailComponent,
    EpuReSupplyQueryComponent,
    EpuViePriceListComponent,
    EpuViePriceQueryComponent,
    EpuViePriceDetailsComponent,
    EpuViePriceResultComponent,
    EpuViePriceAddComponent,
    EpuViePriceEditComponent,
    CountdownComponent,
} from './components';
import {
    RemoveSpaceDirective,
    CopyCutDirective
} from './directives';

@NgModule({
    declarations: [
        EpuFirCategoryMixComponent,
        EpuFirCategoryQueryComponent,
        EpuSecCategoryMixComponent,
        EpuSecCategoryQueryComponent,
        EpuPaymentModeMixComponent,
        EpuPaymentModeQueryComponent,
        EpuSettlementModeMixComponent,
        EpuSettlementModeQueryComponent,
        EpuSupplierMixComponent,
        EpuSupplierQueryComponent,
        EpuMaterialMixComponent,
        EpuMaterialQueryComponent,
        EpuReSupplyListComponent,
        EpuReSupplyDetailComponent,
        EpuReSupplyQueryComponent,
        EpuViePriceListComponent,
        EpuViePriceQueryComponent,
        EpuViePriceDetailsComponent,
        EpuViePriceResultComponent,
        EpuViePriceAddComponent,
        EpuViePriceEditComponent,
        CountdownComponent,
        RemoveSpaceDirective,
        CopyCutDirective
    ],
    imports: [
        EPurchaseRoutingModule,
        SharedModule
    ]
})
// E采购管理模块
export class EPurchaseModule { }
