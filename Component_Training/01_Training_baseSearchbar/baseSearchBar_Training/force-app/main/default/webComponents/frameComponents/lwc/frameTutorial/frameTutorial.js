import { LightningElement, api } from 'lwc';

export default class frameTutorial extends LightningElement {
    _title;
    _icon;

    // setters and getters
    @api
    set settings(val) {
        this._title = val?.title ? val.title : 'generic';
        this._icon  = val?.icon ? val.icon : 'standard:custom_component_task'
    }

    get settings() {
        return {
            title: this._title,
            icon: this._icon
        }
    }
}