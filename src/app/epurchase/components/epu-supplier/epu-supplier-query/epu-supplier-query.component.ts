import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalSettingService } from 'src/app/core';

@Component({
    selector: 'app-epu-supplier-query',
    templateUrl: './epu-supplier-query.component.html',
    styleUrls: ['./epu-supplier-query.component.less']
})
export class EpuSupplierQueryComponent implements OnInit {
    // query form
    public theFormGroup: FormGroup;
    @Input() public isVisible = false;

    @Output() sendClick = new EventEmitter();
    controlSize: any;
    public stateList: { label: string; value: number; }[] = [{
        label: '启用中', value: 1,
    }, {
        label: '已删除或已禁用', value: 0,
    }, {
        label: '全匹配', value: null,
    }];

    constructor(
        public globalSetApi: GlobalSettingService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        // inti queryform
        this.controlSize = this.globalSetApi.controlSize;
        this.theFormGroup = this.fb.group({
            code: [null],
            supplierName: [null],
            state: [1]
        });
    }

    handleOk(): void {
        const data = this.theFormGroup.value;
        const result = [
            { fieldName: 'code', operator: 'equal', fieldValue: data.code },
            { fieldName: 'supplierName', operator: 'like', fieldValue: data.supplierName },
            { fieldName: 'state', operator: 'equal', fieldValue: data.state }
        ];
        this.sendClick.emit({ clickOkBtn: true, data: result });
    }

    handleCancel(): void {
        this.sendClick.emit({ clickOkBtn: false });
    }
}

