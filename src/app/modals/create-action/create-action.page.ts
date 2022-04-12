import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';

@Component({
    selector: 'app-create-action',
    templateUrl: './create-action.page.html',
    styleUrls: ['./create-action.page.scss'],
})
export class CreateActionPage implements OnInit {
    public action = [
        {
            name: 'date',
            value: '',
            nextActions: {
                name: 'select time',
                action: [
                    {
                        name: 'hour',
                        options: [
                            { text: '', value: 'dog' },
                            { text: 'Cat', value: 'cat' },
                            { text: 'Bird', value: 'bird' },
                        ],
                    },
                    {
                        name: 'minute',
                        options: [
                            {
                                text: '1',
                                value: 1,
                            },
                            {
                                text: '2',
                                value: 2,
                            },
                        ],
                    },
                    {
                        name: 'time',
                        options: [
                            {
                                text: 'am',
                                value: 'am',
                            },
                            {
                                text: 'pm',
                                value: 'pm',
                            },
                        ],
                    },
                ],
            },
        },
    ];

    constructor(private pickerController: PickerController) {}

    ngOnInit() {}

    async presentPicker() {   }
}
