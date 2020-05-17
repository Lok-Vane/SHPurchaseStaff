import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalSettingService } from 'src/app/core';

@Component({
    selector: 'app-epu-resupply-query',
    templateUrl: './epu-resupply-query.component.html',
    styleUrls: ['./epu-resupply-query.component.less']
})
export class EpuReSupplyQueryComponent implements OnInit {
    // query form
    public theFormGroup: FormGroup;
    @Input() public isVisible = false;

    @Output() sendClick = new EventEmitter();
    controlSize: string;
    public stateList: { label: string; value: number; }[] = [{
        label: '启用中', value: 1,
    }, {
        label: '已删除或已禁用', value: 0,
    }, {
        label: '全匹配', value: null,
    }];

    constructor(
        private fb: FormBuilder,
        public globalSetApi: GlobalSettingService
    ) { }

    ngOnInit() {
        this.controlSize = this.globalSetApi.controlSize;
        // inti queryform
        this.theFormGroup = this.fb.group({
            supplierName: [null],
            orgName: [null],
            oneCategoryName: [null],
            state: [1],
        });
    }

    handleOk(): void {
        const data = this.theFormGroup.value;
        const result = [
            { fieldName: 'supplierName', operator: 'like', fieldValue: data.supplierName },
            { fieldName: 'orgName', operator: 'like', fieldValue: data.orgName },
            { fieldName: 'oneCategoryName', operator: 'like', fieldValue: data.oneCategoryName },
            { fieldName: 'state', operator: 'equal', fieldValue: data.state },
        ];
        this.sendClick.emit({ clickOkBtn: true, data: result });
    }

    handleCancel(): void {
        this.sendClick.emit({ clickOkBtn: false });
    }
}

