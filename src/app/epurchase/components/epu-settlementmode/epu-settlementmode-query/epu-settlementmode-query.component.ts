import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalSettingService } from 'src/app/core';

@Component({
    selector: 'app-epu-settlementmode-query',
    templateUrl: './epu-settlementmode-query.component.html',
    styleUrls: ['./epu-settlementmode-query.component.less']
})
export class EpuSettlementModeQueryComponent implements OnInit {
    // query form
    public theFormGroup: FormGroup;
    @Input() public isVisible = false;

    @Output() sendClick = new EventEmitter();
    controlSize: any;

    constructor(
        public globalSetApi: GlobalSettingService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.controlSize = this.globalSetApi.controlSize;
        // inti queryform
        this.theFormGroup = this.fb.group({
            code: [null],
            value: [null],
            // state: [1],
            // classify: [1],
        });
    }

    handleOk(): void {
        const data = this.theFormGroup.value;
        const result = [
            { fieldName: 'code', operator: 'like', fieldValue: data.code },
            { fieldName: 'value', operator: 'like', fieldValue: data.value },
            // { fieldName: 'state', operator: 'equal', fieldValue: data.state },
            // { fieldName: 'classify', operator: 'equal', fieldValue: data.classify },
        ];
        this.sendClick.emit({ clickOkBtn: true, data: result });
    }

    handleCancel(): void {
        this.sendClick.emit({ clickOkBtn: false });
    }
}

