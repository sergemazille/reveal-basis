Reveal Basis
============

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
	- [Note on installation](#note-on-installation)
- [Components](#components)
	- [Above](#above)
		- [Usage](#usage)
			- [Trigger an `.above` with a button, through a `[data-target]` attribute](#trigger-an-above-with-a-button-through-a-data-target-attribute)
			- [Trigger an `.above` with an anchor, through a `[href]` attribute](#trigger-an-above-with-an-anchor-through-a-href-attribute)
			- [Trigger an `.above` with a button inside an '.above-group' element](#trigger-an-above-with-a-button-inside-an-above-group-element)
		- [Modifiers](#modifiers)
			- [Transitions](#transitions)
			- [Modal dialog box](#modal-dialog-box)
			- [Drawer](#drawer)
			- [Customization examples](#customization-examples)
		- [Note](#note)

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
    <div class="above above-top above-modal" id="test-above">
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
import * as reveal from 'reveal-basis';

reveal.overlay.show();

```

## Note on installation

You shouldn't use both `<script>` **and** `npm install` in your project as it will initialize `spinner` and `overlay` elements twice.

# Components

## Above

`above` component's purpose is to display an element above the current page content (imagine a modal dialog box or a drawer type sliding menu).

### Usage

The triggering element (button or anchor) needs to contain `data-toggle="above"` attribute.

An eventual closing element needs to have the `.dismiss` class and to be inside the `.above` element. It can only be triggered with a 'click' event.

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

[> Play with the example](https://sergemazille.github.io/reveal-basis#above-core-button)

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
[> Play with the example](https://sergemazille.github.io/reveal-basis#above-core-link)

#### Trigger an `.above` with a button inside an '.above-group' element
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
[> Play with the example](https://sergemazille.github.io/reveal-basis#above-core-group)

### Modifiers
Default `.above` behaviour can be extended by adding some modifier classes.

#### Transitions

Reveal Basis has a few bonus classes to make an `.above` element slide from one side of the view: `.above-top`, `.above-right`, `.above-bottom`, `.above-left`:

`<div class="above above-left">`


There is also an `.above-scale` modifier:

`<div class="above above-scale">`

[> Play with the example](https://sergemazille.github.io/reveal-basis#above-transitions)

#### Modal dialog box

The `.above-modal` class constrains the `.above` element to the center of the view (horizontally and vertically).

Its dimensions are shrinked to half its width by default:
`<div class="above above-modal">`

It can also leverage a transition modifier:
`<div class="above above-modal above-top">`

[> Play with the example](https://sergemazille.github.io/reveal-basis#above-modals)

#### Drawer

An `.above-drawer` could be used to toggle a side menu, for example.

It has to use a static positioning modifier (eg. `.above-drawer-left`) or a transition one (eg. `.above-transtion-right`).

Notes:
- if no positioning modifier is used, an `.above-drawer` will behave the same as a simple `.above` element.

- If [you are overriding default variables](#override-default-styles), you can change the default dimension set by `$above-drawer-dimension` variable.

[> Play with the example](https://sergemazille.github.io/reveal-basis#above-drawers)

#### Customization examples

You can build upon the `.above` element and its modifiers to create your own custom elements.

[> Play with the example](https://sergemazille.github.io/reveal-basis#above-themes)


### Note

If you are overriding default variables, be aware that global padding of `above` component has to be explicitly given through `$above-padding` variable as it is needed for positioning calculation.

The visibility state modifier class for an `.above` element is `.is-visible`.
