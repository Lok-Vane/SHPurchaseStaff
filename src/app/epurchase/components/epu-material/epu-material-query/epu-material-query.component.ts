import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalSettingService } from 'src/app/core';

@Component({
    selector: 'app-epu-material-query',
    templateUrl: './epu-material-query.component.html',
    styleUrls: ['./epu-material-query.component.less']
})
export class EpuMaterialQueryComponent implements OnInit {
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
        this.controlSize = this.globalSetApi.controlSize;
        // inti queryform
        this.theFormGroup = this.fb.group({
            code: [null],
            productName: [null],
            specifications: [null],
            state: [1]
        });
    }

    handleOk(): void {
        const data = this.theFormGroup.value;
        const result = [
            { fieldName: 'code', operator: 'equal', fieldValue: data.code },
            { fieldName: 'productName', operator: 'like', fieldValue: data.productName },
            { fieldName: 'specifications', operator: 'like', fieldValue: data.specifications },
            { fieldName: 'state', operator: 'equal', fieldValue: data.state }
        ];
        this.sendClick.emit({ clickOkBtn: true, data: result });
    }

    handleCancel(): void {
        this.sendClick.emit({ clickOkBtn: false });
    }
}

