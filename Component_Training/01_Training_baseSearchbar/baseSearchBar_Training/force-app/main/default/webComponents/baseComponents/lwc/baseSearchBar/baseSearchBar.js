import { LightningElement, api } from "lwc";
import { search } from "./baseSearchBarHelper";

export default class BaseSearchBar extends LightningElement {
    _list = []; // falttened list to filter against, 'read only' property populated by setter
    _propsToSearch = []; // comparison field, 'read only' property populated by setter

    requiredProperties = {
        list: false
    };

    // uses the "every" array method to check if every required property is set to true
    validate() {
        return Object.values(this.requiredProperties).every((property) => property === true);
    }

    // Dispatches event with a filtered array if the validate function evaluates to true, else it throws a handled error
    handleChange(event) {
        try {
            !this.validate() && this.throwRequiredFieldsError();
            this.dispatchEvent(new CustomEvent("filterlistbysearch", { detail: this.returnFilteredList(event) })); // dispatching filtered array
        } catch (error) {
            console.error(error);
        }
    }

    // Invokes and returns output of imported search helper function
    returnFilteredList(event) {
        return search(this._list, event.detail.value, this._propsToSearch);
    }

    // chains the entries, filter and map array methods to grab all required properties that are missing
    // then throws an error indicating which required fields are missing or invalid using a template literal
    throwRequiredFieldsError() {
        const emptyFields = Object.entries(this.requiredProperties)
            .filter((entryArray) => entryArray[1] === false)
            .map((badProperty) => badProperty[0]);
        throw new Error(`Error: The following required properties are missing or invalid: [${emptyFields}]`); // template literal
    }

    // getters and setters
    @api
    set list(val) {
        if (val?.length) {
            // is truthy and not an empty array?
            this._list = val;
            this.requiredProperties.list = true;
        }
    }

    get list() {
        return this._list;
    }

    @api
    set propsToSearch(val) {
        if (val?.length) {
            // is truthy and not an empty array?
            this._propsToSearch = val;
            this.requiredProperties.searchString = true;
        }
    }

    get propsToSearch() {
        return this._propsToSearch;
    }
}
