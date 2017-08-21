Reveal Basis
============

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Reveal Basis is a 'no dependencies' UI Kit which provides a set of tools to ease the front end developer job.

It aims to help with DOM elements that have to be shown/hidden (spinner, modals, notifications, etc.) by providing basis toggling and triggering mechanism.

You can [have a look at some code samples](https://sergemazille.github.io/reveal-basis/) on the library examples page.

Components are built to be the less opinionated possible. For example, at the 'core' level an `.above` element does nothing but appear on top of the page content.

The real benefits come from the 'modifier' layer where you can define some custom behaviour, constrain width or position, etc.

This separation of concerns allows you to benefit from the core mechanism of the library as a basis, a starting point from which you can add whatever fits your needs.

Reveal Basis supplies a few common modifiers, like modals or notification transitions. They can be used as examples to create your own and can easily be overridden if need be.

Table of Content
================

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Installation](#installation)
	- [Install with regular `<link>` and `<script>` tags](#install-with-regular-link-and-script-tags)
	- [Install with NPM](#install-with-npm)
		- [Override default styles](#override-default-styles)
- [Components](#components)
	- [Above](#above)
		- [Above: Usage](#above-usage)
			- [Above: Options](#above-options)
			- [Trigger an `.above` with a button, through a `[data-target]` attribute](#trigger-an-above-with-a-button-through-a-data-target-attribute)
			- [Trigger an `.above` with an anchor, through a `[href]` attribute](#trigger-an-above-with-an-anchor-through-a-href-attribute)
			- [Trigger an `.above` with a button inside an `.above-group` element](#trigger-an-above-with-a-button-inside-an-above-group-element)
		- [Above: Modifiers](#above-modifiers)
			- [Transitions](#transitions)
			- [Modal dialog box](#modal-dialog-box)
			- [Drawer](#drawer)
			- [Customization examples](#customization-examples)
		- [Above: Note](#above-note)
	- [Notification](#notification)
		- [Notification: Usage](#notification-usage)
			- [Static notifications](#static-notifications)
				- [Static notifications: modifiers](#static-notifications-modifiers)
			- [Scripted notifications](#scripted-notifications)
				- [Notification options](#notification-options)
	- [Drop](#drop)
		- [Drop: Usage](#drop-usage)
			- [Trigger a `.drop` with a button, through a `[data-target]` attribute](#trigger-a-drop-with-a-button-through-a-data-target-attribute)
			- [Trigger a `.drop` with an anchor, through a `[href]` attribute](#trigger-a-drop-with-an-anchor-through-a-href-attribute)
			- [Trigger a `.drop` with a button inside a `.drop-group` element](#trigger-a-drop-with-a-button-inside-a-drop-group-element)
			- [Drop: Modifiers](#drop-modifiers)

<!-- /TOC -->

# Installation

## Install with regular `<link>` and `<script>` tags

Reveal Basis stylesheet and script file contain core mechanisms for toggling components and are needed for the library to work.

As you would do with a lot of other libraries, you can install it by inserting a `<link>` tag in your page's `<head>` and a `<script>` tag just before the body closing tag `</body>`:

Copy the `reveal-basis.min.js` and the `reveal-basis.css` files (both found in the [`dist` folder](https://github.com/sergemazille/reveal-basis/tree/master/dist)) into your own project structure (eg. `lib/js/reveal-basis.min.js`) and insert them into your page template:
```html
<head>
    [...]
    <link rel="stylesheet" href="lib/css/reveal-basis.css">
</head>

<body>
    [...]
    <script src="lib/js/reveal-basis.min.js"></script>
</body>
```

You can test if the library is correctly set up with an `above` component:
```html
<!-- index.html -->
<head>
    <link rel="stylesheet" href="lib/css/reveal-basis.css">
</head>

<body>
    <button data-toggle="above" data-target="#test-above">Show a modal-ipsum</button>
    <div class="above --type-modal --position-top" id="test-above">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae, ex maiores minus nesciunt provident quos vitae voluptatem. Distinctio dolor, explicabo iste minus molestiae ullam vero! Adipisci provident reiciendis veniam.
    </div>

    <script src="lib/js/reveal-basis.min.js"></script>
</body>
```

## Install with NPM

Reveal Basis is also available as a Node package.

To download and install it locally in your `node_modules` folder, just type this command within your project root folder:

`npm install --save reveal-basis`

You will then be able to use it the ES6 way, in your own script files:
```typescript
// script.js
import * as reveal from 'reveal-basis';

reveal.notification.create({
    message: "Hello World!",
    duration: 3000 // in milliseconds
});

```

### Override default styles

One of the advantages of installing Reveal Basis via NPM is that you can change library style defaults with Sass.

You can find all the variables names used by the library in the [`src/style/components/_variables.scss` file](https://github.com/sergemazille/reveal-basis/blob/master/src/style/components/_variables.scss).

As the Sass keyword `!default` is used, you can override those values within your own Sass build process, [as you would do with Bootstrap variables](https://getbootstrap.com/docs/4.0/getting-started/options/) for example.

Let's see an example:

```scss
// _myOwnVariables.scss
$overlay-background-color: red;
```

```scss
// main.scss
@import 'myOwnVariables'; // import your custom file first
@import '~reveal-basis/src/style/components/_variables.scss'; // the `~` stands for the node_modules folder

```

And now you can display your beautiful red overlay:

```typescript
// script.js
import * as rb from 'reveal-basis';

rb.overlay.show();

```

# Components

## Above

`above` component's purpose is to display an element above the current page content (imagine a modal dialog box or a drawer type sliding menu).

### Above: Usage

The triggering element (button or anchor) needs to contain `data-toggle="above"` attribute.

An eventual closing element needs to have the `.dismiss` class and to be inside the `.above` element. It can only be triggered with a 'click' event.

#### Above: Options
**`.--no-overlay`**

By default, triggering an `.above` element will also trigger the page's `#overlay` element. This behaviour can been changed by adding a `.--no-overlay` class on the `.above` element.

`<div class="above --no-overlay">Lorem ipsum...</div>`

**`.--lock-overlay`**

The `.above` element is dismissed when the page's `#overlay` is clicked. To change this behaviour, just add a `.--lock-overlay` class on the `.above` element.

`<div class="above --lock-overlay">Lorem ipsum...</div>`

Let's see some 'core' examples (just wait for the 'modifier' section for funnier stuff):

#### Trigger an `.above` with a button, through a `[data-target]` attribute
```html
<!-- this button will toggle an '.above' element which 'id' is 'targeted-above' -->
<button data-toggle="above" data-target="#targeted-above">Show</button>

<!-- this is the '.above' element that will be triggered -->
<div id="targeted-above" class="above">
    <button class="dismiss">Hide</button>
    <p>Lorem ipsum dolor sit amet...</p>
</div>
```

#### Trigger an `.above` with an anchor, through a `[href]` attribute
```html
<!-- this anchor tag will toggle an '.above' element which 'id' is 'targeted-above' -->
<a data-toggle="above" href="#targeted-above">Show</a>

<!-- this is the '.above' element that will be triggered -->
<div id="targeted-above" class="above">
    <button class="dismiss">Hide</button>
    <p>Lorem ipsum dolor sit amet...</p>
</div>
```

#### Trigger an `.above` with a button inside an `.above-group` element
```html
<div class="above-group">

    <!-- trigger and '.above' are enclosed by an '.above-group' element,
    no need for a [data-target] or a [href] attributes here -->
    <button data-toggle="above">Show</button>

    <div class="above">
        <button class="dismiss">Hide</button>
        <p>Lorem ipsum dolor sit amet...</p>
    </div>

</div>
```
[> Play with the examples](https://sergemazille.github.io/reveal-basis#above-core)

### Above: Modifiers
Default `.above` behaviour can be extended by adding some modifier classes.

#### Transitions

Reveal Basis has a few bonus classes to make an `.above` element slide from one side of the view: `.--transition-top`, `.--transition-right`, `.--transition-bottom`, `.--transition-left`:

`<div class="above --transition-left">`


There is also a `.--transition-scale` modifier:

`<div class="above --transition-scale">`

[> Play with the examples](https://sergemazille.github.io/reveal-basis#transitions)

#### Modal dialog box

The `.--type-modal` class constrains the `.above` element to the center of the view (horizontally and vertically).

Its dimensions are shrinked to half its width by default:
`<div class="above --type-modal">`

It can also leverage a transition modifier:
`<div class="above --type-modal --transition-top">`

[> Play with the examples](https://sergemazille.github.io/reveal-basis#modals)

#### Drawer

An 'drawer' type `above` (`.--type-drawer`) could be used to toggle a side menu, for example.

It has to use a static positioning modifier (eg. `.--position-left`) or a transition one (eg. `.--transition-right`).

Notes:

**if no positioning modifier is used**, an drawer type `above` (`.--type-drawer`) will behave the same as a simple `.above` element.

**if [you are overriding default variables](#override-default-styles)**, you can change the default dimension set by `$above-drawer-dimension` variable.

[> Play with the examples](https://sergemazille.github.io/reveal-basis#drawers)

#### Customization examples

You can build upon the `.above` element and its modifiers to create your own custom elements.

[> Play with the examples](https://sergemazille.github.io/reveal-basis#customization-examples)


### Above: Note

If you are overriding default variables, be aware that global padding of `above` component has to be explicitly given through `$above-padding` variable as it is needed for positioning calculation.

The visibility state modifier class for an `.above` element is `.is-visible`.

## Notification

`notification`s are alerting components types.

For example, a notification can be displayed as a feedback when the website user has performed an operation (eg. successful login).

### Notification: Usage

Notifications can be used either after a page load (`.notification`s already on DOM) or triggered manually (eg. after a user has clicked on something)

#### Static notifications

The typical use for a static `.notification` is when a user has just been redirected to a new page after some kind of event.

eg. User is welcomed on their profile page after a successful login validation:

`<div class="notification">Welcome on your profile page</div>`

To display a notification on page load, just add the `.notification` class on one of your template's element.
It will 'convert' it to a notification along with all its content, including buttons, links, images, etc.

<span style="text-decoration: underline;">options:</span>

To make it dismissible (with a click), just add the `.dismiss` class directly on the notification or on a trigger element inside it.

`<div class="notification dismiss">Click anywhere to dismiss me</div>`

`<div class="notification">Click <span class="dismiss">here</span> to dismiss me</div>`

To make the notification stick, add the `.--sticky` class, it will remove the default duration.

`<div class="notification --sticky">I won't disappear... like ever...</div>`

[> Play with the examples](https://sergemazille.github.io/reveal-basis#notification-core)

##### Static notifications: modifiers

A simple block appearing on top of your content being kind of limited, Reveal Basis supplies some useful modifiers.

**position and width (`--position-right`, `--width-auto`):**

[> Play with the examples](https://sergemazille.github.io/reveal-basis#width-and-position)

**transition - slide (`--transition-slide`):**

[> Play with the examples](https://sergemazille.github.io/reveal-basis#transition-slide)

**transition - fade (`--transition-fade`):**

[> Play with the examples](https://sergemazille.github.io/reveal-basis#transition-fade)

#### Scripted notifications

The typical use for a scripted `.notification` is to give a direct feedback to the user (without redirection or page reload).

eg. User tried to submit a form but didn't fill a required field in.

The notification is triggered via javascript, using the library `rb` (**r**eveal **b**asis) global variable, along with its `notification.create` method.

```typescript
<script>
    [... (failed form validation)]

    rb.notification.create("Please fill in all the required fields");
</script>
```

[> Play with the example](https://sergemazille.github.io/reveal-basis#scripted-notification)

##### Notification options

The `create` method accepts an option object as an optional second parameter:

```typescript
<script>
    [...]

    rb.notification.create("Please fill in all the required fields", {
        classes: [],
        position: 'left',
        width: 'auto',
        transitions: ['slide', 'fade'],
        duration: 6000,
        speed: 300,
        dismissOnClick: true,
    });
</script>
```

<span style="text-decoration: underline;">classes:</span> an array of classes (eg. `classes: ["error", "small"]`)

default: empty array

Just pass the css classes you want for your `notification` (eg. "my-warning-notification").

<span style="text-decoration: underline;">position:</span> a string, either 'left' or 'right'

default: "left"

This option is used with `width` and/or `transitions` options.

Used with `width: 'auto'`, the notification will stick on the *`position`* side of the screen (if its content isn't already screen wide).

Used with `transitions: ['slide']`, the notification will appear on screen from the *`position`*-hand side.

<span style="text-decoration: underline;">width:</span> a string, either 'full' or 'auto'

default: "auto"

By default a `notification` will be displayed on the entire device screen width ('full').
If this option is set to 'auto', the `notification` with only be as wide as its content.

<span style="text-decoration: underline;">transitions:</span> an array of transition modifiers (eg. `transitions: ["slide", "fade", "insert-your-own"]`)

default: ["slide", "fade"]

Those two transitions are set by default because you will likely want them on your typical notification.
You can get rid of them by passing an empty array `transitions: []` or your own custom transition(s).

Reveal Basis ships with a few transition modifiers:

"slide" will make your notification slide in and out of the screen.

"fade" will make it fade in and out.

You totally can combine all the transitions to achieve the effect you want.

<span style="text-decoration: underline;">To create your own transition, you will have to follow some simple rules:</span>

- its class name has to start with `.--transition-`

- define the 'normal' and the 'is-visible' state

```css
/* my custom transition */
.--transition-custom {
  transform: rotateZ(0deg);
  width: 100%;
}
.--transition-custom.is-visible {
  transform: rotateZ(720deg);
  width: 25%;
}
```

<span style="text-decoration: underline;">duration:</span> an int

default: 6000

Duration is set in milliseconds (`1000` equals 1 second) and represents the time the notification will be displayed.

A duration of `0` will keep the notification indefinitely on screen.

<span style="text-decoration: underline;">speed:</span> an int

default: 300

Speed is the transition speed. It will have no effect if no transitions are set `transitions: []`.

<span style="text-decoration: underline;">dismissOnClick:</span> a boolean

default: true

As its name implies, if dismissOnClick option is passed, the notification will be dismiss when user click on it.

The library add a `dismiss` class on the notification. You can take advantage on this to add custom style to differentiate between dismissible notifications and non-dismissible ones.

[> Play with the example](https://sergemazille.github.io/reveal-basis#scripted-notification-options)

## Drop

`drop` component's purpose is to display a hidden element near the triggering element (eg. a dropdown menu).

### Drop: Usage

Similarly to an `.above`, the triggering element (button, anchor, span or whatever) needs to contain `data-toggle="drop"` attribute.

To hide back the `.drop` element, just click again on the trigger button or move your mouse outside a `.--trigger-hover` `.drop`'s trigger.

Let's see some 'core' examples:

#### Trigger a `.drop` with a button, through a `[data-target]` attribute
```html
<!-- button triggered drop -->
<button data-toggle="drop" data-target="#button-trigger">Trigger drop with a button</button>

<div id="button-trigger" class="drop bg-gray">
    <p>This drop has been triggered by <b>a button</b></p>
</div>
```

#### Trigger a `.drop` with an anchor, through a `[href]` attribute
```html
<!-- anchor triggered drop -->
<a data-toggle="drop" href="#anchor-trigger">Trigger drop with an anchor</a>

<div id="anchor-trigger" class="drop bg-gray">
    <p>This drop has been triggered by <b>an anchor</b></p>
</div>
```

#### Trigger a `.drop` with a button inside a `.drop-group` element
```html
<!-- trigger and '.drop' are enclosed in an '.drop-group' element, no need for a [data-target] or a [href] attributes here -->
<div class="drop-group">

    <button data-toggle="drop">Trigger drop within a group</button>

    <div class="drop bg-gray">
        <p>This drop has been triggered within <b>a drop-group</b>, without being specifically targeted</p>
    </div>
</div>
```
[> Play with the examples](https://sergemazille.github.io/reveal-basis#drop-core)

#### Drop: Modifiers
**`.--type-block`**

By default, a `.drop` element will appear above the page's content. Adding the `.--type-block` modifier will get the element inside the content flow, as a block type would.

`<div class="drop --type-block">Lorem ipsum...</div>`

**`.--trigger-hover`**

This option allow a `.drop` element to be triggered via an hover event on the trigger element.

Both trigger and `.drop` elements has to be inside the same `.drop-group` container:

```html
<!-- drop is triggered by hovering the drop-group trigger element -->
<div class="drop-group">

    <div data-toggle="drop">Trigger drop on hover</div>

    <div class="drop --trigger-hover bg-gray">
        <p>This drop has been triggered by an hover event</p>
    </div>
</div>
```
[> Play with the examples](https://sergemazille.github.io/reveal-basis#drop-modifiers)
