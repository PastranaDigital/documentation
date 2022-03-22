import { LightningElement } from 'lwc';
import { tutorialHelper } from 'c/utils';

export default class FeaturePracticeCoreComponents extends LightningElement {
    data = tutorialHelper.dummyData;
    displayData;
    noResults;

    props = ['title', 'author'];

    settings = {
        title: 'Bookshelf',
        icon: 'standard:article'
    };

    connectedCallback () {
        if(!this.data) return;
        
        this.data.forEach(element => {
            element.stars = this.addStars(element.rating);
        });
        this.displayData = this.data;
    }

    //⭐️
    addStars (number) {
        let string = '';
        for (let i = 0; i < number; i++) {
            string += '⭐️';
        }

        return string;
    }

    handleSearch (event) {
        this.displayData = event.detail;
        this.displayData.length > 0 ? this.noResults = false : this.noResults = true; 
    }
}