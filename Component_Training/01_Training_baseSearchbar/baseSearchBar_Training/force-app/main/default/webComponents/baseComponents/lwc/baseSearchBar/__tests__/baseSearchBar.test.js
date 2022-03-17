import { createElement } from "lwc";
import baseSearchBar from "c/baseSearchBar";

const data = require("./data/data.json");

describe("c-base-search-bar", () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it("Successful filter with given properties and result", () => {
        const element = createElement("c-base-search-bar", {
            is: baseSearchBar
        });
        const handler = jest.fn();

        element.list = data;
        element.propsToSearch = ["ip_address"];

        element.addEventListener("filterlistbysearch", handler);

        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const searchBox = element.shadowRoot.querySelector("lightning-input");
                searchBox.dispatchEvent(new CustomEvent("change", { detail: { value: "100" } }));
            })
            .then(() => {
                expect(handler).toHaveBeenCalledTimes(1);
                expect(handler.mock.calls[0][0].detail.length).toBe(1);
            });
    });

    it("Successful filter and result", () => {
        const element = createElement("c-base-search-bar", {
            is: baseSearchBar
        });
        const handler = jest.fn();

        element.list = data;
        element.propsToSearch = null;

        element.addEventListener("filterlistbysearch", handler);

        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const searchBox = element.shadowRoot.querySelector("lightning-input");
                searchBox.dispatchEvent(new CustomEvent("change", { detail: { value: "mar" } }));
            })
            .then(() => {
                expect(handler).toHaveBeenCalledTimes(1);
                expect(handler.mock.calls[0][0].detail.length).toBe(3);
            });
    });

    it("Successful filter and no results", () => {
        const element = createElement("c-base-search-bar", {
            is: baseSearchBar
        });
        const handler = jest.fn();

        element.list = data;
        element.propsToSearch = null;

        element.addEventListener("filterlistbysearch", handler);

        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const searchBox = element.shadowRoot.querySelector("lightning-input");
                searchBox.dispatchEvent(new CustomEvent("change", { detail: { value: "xylry" } }));
            })
            .then(() => {
                expect(handler).toHaveBeenCalledTimes(1);
                expect(handler.mock.calls[0][0].detail.length).toBe(0);
            });
    });
    it("Empty search and all results are shown", () => {
        const element = createElement("c-base-search-bar", {
            is: baseSearchBar
        });
        const handler = jest.fn();

        element.list = data;
        element.propsToSearch = null;

        element.addEventListener("filterlistbysearch", handler);

        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const searchBox = element.shadowRoot.querySelector("lightning-input");
                searchBox.dispatchEvent(new CustomEvent("change", { detail: { value: null } }));
            })
            .then(() => {
                expect(handler).toHaveBeenCalledTimes(1);
                expect(handler.mock.calls[0][0].detail.length).toBe(100);
            });
    });

    it("Blank search and all results are shown", () => {
        const element = createElement("c-base-search-bar", {
            is: baseSearchBar
        });
        const handler = jest.fn();

        element.list = data;
        element.propsToSearch = null;

        element.addEventListener("filterlistbysearch", handler);

        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const searchBox = element.shadowRoot.querySelector("lightning-input");
                searchBox.dispatchEvent(new CustomEvent("change", { detail: { value: " " } }));
            })
            .then(() => {
                expect(handler).toHaveBeenCalledTimes(1);
                expect(handler.mock.calls[0][0].detail.length).toBe(100);
            });
    });

    it("Non-text search and no results are shown", () => {
        const element = createElement("c-base-search-bar", {
            is: baseSearchBar
        });
        const handler = jest.fn();

        element.list = data;
        element.propsToSearch = null;

        element.addEventListener("filterlistbysearch", handler);

        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const searchBox = element.shadowRoot.querySelector("lightning-input");
                searchBox.dispatchEvent(new CustomEvent("change", { detail: { value: "@#" } }));
            })
            .then(() => {
                expect(handler).toHaveBeenCalledTimes(1);
                expect(handler.mock.calls[0][0].detail.length).toBe(0);
            });
    });
});
