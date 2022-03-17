import { LightningElement } from 'lwc';

import { tutorialHelper } from 'c/utils';

export default class FeaturePracticeCoreComponents extends LightningElement {
    data = tutorialHelper.dummyData;

    settings = {
        title: 'Users HDR Component',
        icon: 'standard:account'
    };

    isEmpty = true;
}