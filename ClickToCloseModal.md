# Click Outside of Modal to Close

[CodePen example](https://codepen.io/tobiasdev/pen/XjXgZr)

The modal pops up and has at least one way to close it with keyboard but needs a way to close with mouse more quickly.

<br><br>

## HTML Changes

Standard Salesforce Modal template is used but classes are replaced as follows.

-   `section` has the custom `modal` class and the standard ` slds-fade-in-open` class
-   backdrop `div` is now at the top and has custom `modal__backdrop` class and `onclick` handler
-   main `div` has custom `modal__container` class

```html
<section
	role="dialog"
	tabindex="-1"
	aria-labelledby="modal-heading-01"
	aria-modal="true"
	aria-describedby="modal-content-id-1"
	class="modal slds-fade-in-open"
>
	<div class="modal__backdrop" onclick="{handleClose}"></div>
	<!-- Modal Container -->
	<div class="modal__container">
		<!-- 'X' button that floats top right of modal -->
		<lightning-button-icon
			onclick="{handleClose}"
			variant="bare-inverse"
			size="large"
			icon-name="utility:close"
			class="slds-modal__close"
		></lightning-button-icon>
		<!-- Modal Header -->
		<header class="slds-modal__header slds-modal__header_empty">
			<h2 id="modal-heading-01" if:true="{title.length}" class="slds-modal__title slds-hyphenate">{title}</h2>
		</header>
		<!-- Modal Body -->
		<div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1"></div>
		<!-- Modal Footer -->
		<footer class="slds-modal__footer">
			<div class="buttons">
				<lightning-button
					if:false="{buttons}"
					class="slds-var-m-left_small"
					label="Close"
					onclick="{handleClose}"
				></lightning-button>
			</div>
		</footer>
	</div>
</section>
```

<br><br>

## JS Changes

There needs to be a close handler and there are many ways this can be done. I have seen it used to toggle a flag variable for a statement in an element like below or to turn the display of the wrapping element off entirely.

```html
<!-- html -->
<section if:true="{displayModal}">
	<!-- Modal Contents -->
</section>
```

```js
// js
setProperties(state) {
	switch (state) {
		case "close":
			this.displayModal = false;
			document.body.style.overflow = "visible";
			this.modalSessionId = null;
			break;
		default:
			break;
	}
}
```

<br><br>

## CSS Changes

These are going to override the typical `slds` classes. These help layout the layers of the components so they are at the very top and the backdrop is just behind the top modal layer. To see this more clearly, adjust the background color of the `modal__backdrop` class.

```css
.modal {
	position: fixed;
	display: flex;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	background: rgba(8, 7, 7, 0.6);
	overflow: auto;
	z-index: 900;
	flex-direction: column;
	align-content: center;
	align-items: center;
	justify-content: center;
}

.modal__backdrop {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: transparent;
	/* background: #ff000061; */
	animation: modalbox 0.2s ease-out;
	z-index: -1;
}

.modal__container {
	display: grid;
	width: 70%;
	max-width: 75rem;
	min-width: 40rem;
	animation: modalbox 0.2s ease-out;
}

/* Animation */
@-webkit-keyframes modalbox {
	0% {
		top: -250px;
		opacity: 0;
	}
	100% {
		top: 0;
		opacity: 1;
	}
}

@keyframes modalbox {
	0% {
		top: -250px;
		opacity: 0;
	}
	100% {
		top: 0;
		opacity: 1;
	}
}
```
