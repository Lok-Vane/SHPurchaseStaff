import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ButtonResolve } from '../core';
import {
    EpuFirCategoryMixComponent,
    EpuSecCategoryMixComponent,
    EpuPaymentModeMixComponent,
    EpuSettlementModeMixComponent,
    EpuSupplierMixComponent,
    EpuMaterialMixComponent,
    EpuReSupplyListComponent,
    EpuReSupplyDetailComponent,
    EpuViePriceListComponent,
    EpuViePriceDetailsComponent,
    EpuViePriceResultComponent,
    EpuViePriceAddComponent,
    EpuViePriceEditComponent,

    // StaffindComponent,
    // TenderingComponent,
    // ResultComponent,
    // NewProjectComponent,
    // ModifyProjectComponent,
    // QuoteManagementComponent,
    // SettlementManagementComponent,
    // SupplierManagementComponent,
    // ProjectDetailsComponent,
    // ResultDetailsComponent,
    // SearchInfoComponent,
    // PaymentManagementComponent
} from './components';

const routes: Routes = [
    {
        path: 'fircategory',
        component: EpuFirCategoryMixComponent,
        resolve: {
            buttonCategorys: ButtonResolve
        },
        data: {
            title: '一级分类',
            pageId: '52be9d6670614e82bce13361cfd5dc8d',
            keep: true,
            allowclose: true
        }
    },
    {
        path: 'seccategory',
        component: EpuSecCategoryMixComponent,
        resolve: {
            buttonCategorys: ButtonResolve
        },
        data: {
            title: '二级分类',
            pageId: 'ed94246958f54f608fe29df7a229b285',
            keep: true,
            allowclose: true
        }
    },
    {
        path: 'settlementmode',
        component: EpuSettlementModeMixComponent,
        resolve: {
            buttonCategorys: ButtonResolve
        },
        data: {
            title: '结算方式',
            pageId: 'c5e3411d6de444fb81a37c241c02de21',
            keep: true,
            allowclose: true
        }
    },
    {
        path: 'paymentmode',
        component: EpuPaymentModeMixComponent,
        resolve: {
            buttonCategorys: ButtonResolve
        },
        data: {
            title: '付款方式',
            pageId: '87c00914a6a143f88a9ec021fe286623',
            keep: true,
            allowclose: true
        }
    },
    {
        path: 'supplier',
        component: EpuSupplierMixComponent,
        resolve: {
            buttonCategorys: ButtonResolve
        },
        data: {
            title: '供应商',
            pageId: '93253a85c19d491689a0b61fa5614d6d',
            keep: true,
            allowclose: true
        }
    },
    {
        path: 'material',
        component: EpuMaterialMixComponent,
        resolve: {
            buttonCategorys: ButtonResolve
        },
        data: {
            title: '材料档案',
            pageId: '24dad63b58e4418a879dd96d439e98a0',
            keep: true,
            allowclose: true
        }
    },
    {
        path: 'resupplylist',
        component: EpuReSupplyListComponent,
        resolve: {
            buttonCategorys: ButtonResolve
        },
        data: {
            title: '供应关系列表',
            pageId: 'ce7a40e12a9d4e3c8cd0bd8d5604ebea',
            keep: true,
            allowclose: true
        }
    },
    {
        path: 'resupplydetail',
        component: EpuReSupplyDetailComponent,
        resolve: {
            buttonCategorys: ButtonResolve
        },
        data: {
            title: '供应关系分配',
            pageId: '87c425caa12a4ddf969e84d4ceee0a51',
            keep: true,
            allowclose: true
        }
    },
    {
        path: 'viepricelist',
        component: EpuViePriceListComponent,
        resolve: {
            buttonCategorys: ButtonResolve
        },
        data: {
            title: '竞价项目列表',
            pageId: '3661767e37de4b91887c254323b7daf8',
            keep: true,
            allowclose: true
        }
    },
    {
        path: 'viepricedetail/:bizid',
        component: EpuViePriceDetailsComponent,
        resolve: {
            buttonCategorys: ButtonResolve
        },
        data: {
            title: '竞价项目详情',
            pageId: 'e2ab3609db704b61bc9f815344f1cf06',
            keep: true,
            allowclose: true
        }
    },
    {
        path: 'viepriceresult/:bizid',
        component: EpuViePriceResultComponent,
        data: {
            title: '竞价结果',
            pageId: '1deba07f2fd24bc091d501d2810d1ed6',
            keep: true,
            allowclose: true
        }
    },
    {
        path: 'viepriceadd',
        component: EpuViePriceAddComponent,
        data: {
            title: '竞价项目新增',
            pageId: '1deba07f2fd24bc091d501d2810d1ed6',
            keep: true,
            allowclose: true
        }
    },
    {
        path: 'viepriceedit/:bizid',
        component: EpuViePriceEditComponent,
        data: {
            title: '竞价项目修改',
            pageId: '1deba07f2fd24bc091d501d2810d1ed6',
            keep: true,
            allowclose: true
        }
    },

    // {
    //     path: 'index',
    //     component: StaffindComponent,
    //     resolve: {
    //         buttonCategorys: ButtonResolve
    //     },
    //     data: {
    //         title: 'E采购首页',
    //         pageId: 'e2ab3609db704b61bc9f815344f1cf06',
    //         keep: true,
    //         allowclose: true
    //     }
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EPurchaseRoutingModule { }
