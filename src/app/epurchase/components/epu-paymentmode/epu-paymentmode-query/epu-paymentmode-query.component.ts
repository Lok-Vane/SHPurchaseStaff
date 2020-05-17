import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalSettingService } from 'src/app/core';

@Component({
    selector: 'app-epu-paymentmode-query',
    templateUrl: './epu-paymentmode-query.component.html',
    styleUrls: ['./epu-paymentmode-query.component.less']
})
export class EpuPaymentModeQueryComponent implements OnInit {
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
            value: [null]
        });
    }

    handleOk(): void {
        const data = this.theFormGroup.value;
        const result = [
            { fieldName: 'code', operator: 'equal', fieldValue: data.code },
            { fieldName: 'value', operator: 'like', fieldValue: data.value }
        ];
        this.sendClick.emit({ clickOkBtn: true, data: result });
    }

    handleCancel(): void {
        this.sendClick.emit({ clickOkBtn: false });
    }
}

