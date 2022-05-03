<img alt="Developer Tools Banner" src=".\images\508_Accessibility.png">

# 508 Accessibility Resources

As a developer I need to make sure that my work can be used by as many users as possible.

<br><br>

## _Developer Best Practice_

-   During development, use the keyboard to navigate your work. Can you access all the same funtionality as with a mouse?
-   Use a screen reader to check your work too
    -   [NVDA Screen Reader](https://www.nvaccess.org/download/)

<br><br>

## _Salesforce Resources_

### 🏫 Salesforce LWC Component Library

-   https://developer.salesforce.com/docs/component-library/overview/components
-   ☝🏽 Go to place for omplete components that have built-in accessibility

### 🌩 Lightning Design System

-   https://www.lightningdesignsystem.com/accessibility/overview/
-   Information about how components are created from `raw` code

### 🗂 Known Salesforce Issues

-   https://trailblazer.salesforce.com/issues_index?page=2&tag=Disability+and+Product+Accessibility
-   Great place to look for assistance or confirmation

<br><br>

## _Other Resources_

### 🧾 Web Accessibility Standard

-   https://www.w3.org/WAI/standards-guidelines/wcag/
-   references, rules and clear definitions of violations

### 🏛 Yale Web Acessibility

-   https://usability.yale.edu/web-accessibility/articles/links#hidden-link-text
-   This specific example shows how text can read by the screen reader but hidden to the sighted user (this is used by Salesforce in the example below)

<br><br>

## _Example_

In this example, the `Alert` message is only read, not seen, when the div container is tabbed to. The `slds-assistive-text` hides the text from the user but not the screen reader.

```html
<div tabindex="0">
	<span class="slds-assistive-text">Alert</span>
	<lightning-card class="slds-text-color_error">Error Message to User. </lightning-card>
</div>
```

This CSS is built into Salesforce and is managed by them. Sweet!

```css
.slds-assistive-text {
	position: absolute !important;
	margin: -1px !important;
	border: 0 !important;
	padding: 0 !important;
	width: 1px !important;
	height: 1px !important;
	overflow: hidden !important;
	clip: rect(0 0 0 0) !important;
	text-transform: none !important;
	white-space: nowrap !important;
}

.slds-text-color--error,
.slds-text-color_destructive,
.slds-text-color_error {
	color: #ea001e;
}
```
