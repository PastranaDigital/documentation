import { LightningElement } from 'lwc';
import { tutorialHelper } from 'c/utils';

export default class FeaturePracticeCoreComponents extends LightningElement {
    data = tutorialHelper.dummyData;

    settings = {
        title: 'Bookshelf',
        icon: 'standard:article'
    };

    connectedCallback () {
        if(!this.data) return;
        
        this.data.forEach(element => {
            element.stars = this.addStars(element.rating);
        });
    }

    //⭐️
    addStars (number) {
        let string = '';
        for (let i = 0; i < number; i++) {
            string += '⭐️';
        }

        return string;
    }
}