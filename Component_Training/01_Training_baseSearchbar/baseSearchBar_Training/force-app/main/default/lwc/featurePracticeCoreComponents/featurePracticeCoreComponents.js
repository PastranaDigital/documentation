import { LightningElement } from 'lwc';
import { tutorialHelper } from 'c/utils';

export default class FeaturePracticeCoreComponents extends LightningElement {
    data = tutorialHelper.dummyData2;
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
        console.log('this.displayData: ', this.displayData);
        this.displayData = this.flattenMyCustomDataObject(this.data);
        console.log('this.displayData: ', this.displayData);
    }

    flattenMyCustomDataObject (arrayOfObjects) {
        let flattened = [];    
        arrayOfObjects.forEach((obj) => {
            let prop1;
            let prop2;
            obj.platforms.forEach((el, index) => {
                prop1 = `platformSite${index+1}`;
            console.log(prop1);
                obj[prop1] = el.site;
                prop2 = `platformFormat${index+1}`;
            console.log(prop2);
                obj[prop2] = el.format;
            });
            console.log(obj);
            flattened.push(obj);
        });
        
        return flattened;
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