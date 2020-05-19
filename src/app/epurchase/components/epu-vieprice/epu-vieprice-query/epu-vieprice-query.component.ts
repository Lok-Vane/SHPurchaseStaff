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
    public isSuccessList: { label: string; value: string; }[] = [{
        label: '未开始或竞价中', value: '1',
    }, {
        label: '竞价截止且竞价成功', value: '2',
    }, {
        label: '竞价截止且无合格报价', value: '3',
    }, {
        label: '全匹配', value: '1,2,3',
    }];

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
            isSuccess: ['1,2,3'],
        });
    }

    handleOk(): void {
        const data = this.theFormGroup.value;
        const result = [
            // { fieldName: 'code', operator: this.globalSetApi.equal, fieldValue: data.code },
            { fieldName: 'projectName', operator: this.globalSetApi.like, fieldValue: data.projectName },
            { fieldName: 'orgName', operator: this.globalSetApi.like, fieldValue: data.orgName },
            { fieldName: 'productName', operator: this.globalSetApi.like, fieldValue: data.productName },
            { fieldName: 'isSuccess', operator: this.globalSetApi.in, fieldValue: data.isSuccess },
            { fieldName: 'specifications', operator: this.globalSetApi.like, fieldValue: data.specifications }
        ];
        this.sendClick.emit({ clickOkBtn: true, data: result });
    }

    handleCancel(): void {
        this.sendClick.emit({ clickOkBtn: false });
    }
}

