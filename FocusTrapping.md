# Aura Components with a Flow

In this specific example, the Aura Component references a flow. The inclusion of a flow limits the ability to use the approach mentioned in this [CodePen example](https://codepen.io/myogeshchavan97/pen/zYGVbxN?editors=1010) because the elements are not as accessible when compared to a static elements list.

<br><br>

## Component Changes

It is important that the modal code is wrapped in a `section` that has a `tabindex="-1"`. This will allow for normal tabbing functionality.

Inside the `section` and the modal container `div` there are really 3 sections: header, content and footer. This focus trapping approach needs 2 elements to be identified: `first_element` & `last_element`. The code uses a query selector and looks for these names in the class of the elements.

In our case, the `h1` does not get tabbed focus unless we add `tabindex="0"`. With no other elements to chose from, we force tab focus here as our `first_element`.

```html
<section
	role="dialog"
	tabindex="-1"
	aria-labelledby="modal-heading-01"
	aria-modal="true"
	class="slds-modal slds-fade-in-open"
	style="top: 16%;z-index:100;"
	aura:id="fullCmp"
>
	<div class="slds-modal__container" style="max-width:45rem;min-height:20rem">
		<div class="slds-modal__header">
			<h1 tabindex="0" id="modal-heading-01" class="first_element slds-modal__title slds-hyphenate">
				Modal Title
			</h1>
		</div>
		<div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1" style="min-height:20rem">
			<lightning:flow aura:id="flowData" onstatuschange="{!c.statusChange}" />
		</div>
		<div class="slds-modal__footer">
			<button
				class="last_element slds-button slds-button_neutral"
				aria-label="Cancel and close"
				onclick="{!c.closePopup}"
			>
				Cancel
			</button>
		</div>
	</div>
</section>
```

<br><br>

## Controller Changes

When working this solution, it was noticed that this modal appears very soon in the page load events and therefore cannot be relied upon to simply add focus in the `afterRender` function, although we do it also.

This code goes inside the `init` function of the controller to await user input, a tab key press specifically. This will aid in getting the user's focus into the modal should they not already be there then the `trapFocus` Helper function will handle further tabbing.

```js
//Inside init function on controller

//? event listener to handle trapping of focus to modal
let flagForFocus = false;
window.addEventListener('keydown', (e) => {
	const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
	//? we only care about when the tab key is pressed
	if (!isTabPressed) return;

	//? once we have entered the modal, we should remain in the modal
	if (flagForFocus) {
		helper.trapFocus(e);
		return;
	}

	const theActiveElement = document.activeElement;
	const activeElementString = theActiveElement.toString();
	console.log('activeElementString: ', activeElementString);
	if (activeElementString === undefined) return;

	//? check for background elements with values that are not from the modal
	if (
		activeElementString.includes('https') ||
		activeElementString.includes('javascript:void(0)') ||
		activeElementString.includes('HTMLBodyElement')
	) {
		helper.assignFocus(e);
		flagForFocus = true;
	}
});
```

<br><br>

## Helper Changes

In the Helper, we have placed 2 functions that are used in the `keydown` event listener. These accept the event as a parameter.

```js
({
	assignFocus: function (e) {
		this.focusOnFirstElement();
		e.preventDefault();
	},
	focusOnFirstElement: function () {
		const firstFocusableElement = document.querySelector('.first_element');
		if (!firstFocusableElement) return;
		firstFocusableElement.focus();
	},
	trapFocus: function (e) {
		const firstFocusableElement = document.querySelector('.first_element');
		const lastFocusableElement = document.querySelector('.last_element');

		//? if shift key pressed for shift + tab combination
		if (e.shiftKey) {
			//? if focused has reached the first focusable element then focus on the last focusable element after pressing tab
			if (document.activeElement === firstFocusableElement) {
				lastFocusableElement.focus();
				e.preventDefault();
			}
			//? if only tab key is pressed
		} else {
			//? if focused has reached the last focusable element then focus on the first focusable element after pressing tab
			if (document.activeElement === lastFocusableElement) {
				firstFocusableElement.focus();
				e.preventDefault();
			}
		}
	},
});
```

<br><br>

## Renderer Changes

As mentioned above, this snippet is added to the `afterRender` to begin the focus trapping attempts. It gives focus early in the page load and once the page is loaded, can retain the focus on this element and begin focus trapping.

```js
({
	afterRender: function (cmp, helper) {
		this.superAfterRender();

		//? set focus after first render to begin focus trapping
		helper.focusOnFirstElement();
	},
	rerender: function (cmp, helper) {
		this.superRerender();
	},
	unrender: function (cmp) {
		this.superUnrender();
	},
});
```
