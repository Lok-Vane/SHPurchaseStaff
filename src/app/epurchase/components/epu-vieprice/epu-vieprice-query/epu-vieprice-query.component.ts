import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalSettingService } from 'src/app/core';

@Component({
    selector: 'app-epu-vieprice-query',
    templateUrl: './epu-vieprice-query.component.html',
    styleUrls: ['./epu-vieprice-query.component.less']
})
export class EpuViePriceQueryComponent implements OnInit {
    // query form
    public theFormGroup: FormGroup;
    @Input() public isVisible = false;

    @Output() sendClick = new EventEmitter();
    controlSize: string;

    constructor(
        private fb: FormBuilder,
        public globalSetApi: GlobalSettingService
    ) { }

    ngOnInit() {
        this.controlSize = this.globalSetApi.controlSize;
        // inti queryform
        this.theFormGroup = this.fb.group({
            // code: [null],
            projectName: [null],
            orgName: [null],
            productName: [null],
            specifications: [null],
            // 1.竞价中 2.竞价成功 3.无合格报价
            isSuccess: [null],
        });
    }

    handleOk(): void {
        const data = this.theFormGroup.value;
        const result = [
            // { fieldName: 'code', operator: this.globalSetApi.equal, fieldValue: data.code },
            { fieldName: 'projectName', operator: this.globalSetApi.like, fieldValue: data.projectName },
            { fieldName: 'orgName', operator: this.globalSetApi.like, fieldValue: data.orgName },
            { fieldName: 'productName', operator: this.globalSetApi.like, fieldValue: data.productName },
            { fieldName: 'isSuccess', operator: this.globalSetApi.equal, fieldValue: data.isSuccess },
            { fieldName: 'specifications', operator: this.globalSetApi.like, fieldValue: data.specifications }
        ];
        this.sendClick.emit({ clickOkBtn: true, data: result });
    }

    handleCancel(): void {
        this.sendClick.emit({ clickOkBtn: false });
    }
}

