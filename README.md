# Reveal Basis

Reveal Basis is a 'no dependencies' UI Kit which provides a set of tools to ease the front end developer job.

## Installation

### Regular `<script>` tag

Copy the `reveal-basis.min.js` file (found in `dist` folder) into your own project structure (eg. `lib/reveal-basis.min.js`).

Just refer to it with a regular `<script>` tag before your page body closing tag `</body>`:
```html
<body>
    [...]
    <script src="lib/reveal-basis.min.js"></script>
</body>
```

You can test if the library is correctly set up with an `above` component:
```html
<!-- index.html -->
<body>
    <button data-toggle="above" data-target="#test-above">Show a modal-ipsum</button>
    <div class="above above-top above-modal" id="test-above">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae, ex maiores minus nesciunt provident quos vitae voluptatem. Distinctio dolor, explicabo iste minus molestiae ullam vero! Adipisci provident reiciendis veniam.
    </div>
    
    <script src="lib/reveal-basis.min.js"></script>
</body>
```

### NPM

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

#### Override default styles

One of the advantages of installing Reveal Basis via NPM is that you can change library style defaults with Sass.

You can find all the variables names used by the library in `node_modules/reveal-basis/src/style/components/_variables.scss` file.

To override those values, just redeclare them in your own sass build process, [as you would do with Bootstrap variables](https://getbootstrap.com/docs/4.0/getting-started/options/) for example.


### Note on installation

You shouldn't use both `<script>` **and** `npm install` in your project as it will initialize `spinner` and `overlay` elements twice.

## Components

### Above

`above` component's purpose is to display an element above the current page content (imagine a modal dialog box or a drawer type sliding menu).

#### Usage

The triggering element needs to contain `data-toggle="above"` attribute.

An eventual closing element needs to have the `.dismiss` class and to be inside the `.above` element.

- Trigger an `.above` with a button, through a `[data-target]` attribute:
```html
<!-- this button will toggle an '.above' element which 'id' is 'targeted-above' -->
<button data-toggle="above" data-target="#targeted-above">Open</button>

<!-- this is the '.above' element that will be triggered -->
<div id="targeted-above" class="above">
    Lorem ipsum dolor sit amet...
    <button class="dismiss">Close</button>
</div>
```

- Trigger an `.above` with an anchor `<a>` through a `[href]` attribute:
```html
<!-- this anchor tag will toggle an '.above' element which 'id' is 'targeted-above' -->
<a data-toggle="above" href="#targeted-above">Open</a>

<!-- this is the '.above' element that will be triggered -->
<div id="targeted-above" class="above">
    Lorem ipsum dolor sit amet...
    <button class="dismiss">Close</button>
</div>
```

- Trigger an `.above` with a button inside an '.above-group' element:
```html
<div class="above-group">

    <!-- trigger and '.above' are enclosed by an '.above-group' element,
    no need for a [data-target] or a [href] attributes here -->
    <button data-toggle="above">Open</button>
    <div class="above">
        Lorem ipsum dolor sit amet...
        <button class="dismiss">Close</button>
    </div>
    
</div>
```

#### Modifiers
Default `.above` behaviour can be extended by adding some classes:

- Transitions:

Instead of just popping above current page content, an `above` element can slide from a side of the view. 

Reveal Basis UI Kit supplied classes are `.above-top`, `.above-right`, `.above-bottom`, `.above-left`:

`<div class="above above-left">`


There is also an `.above-scale` modifier:

`<div class="above above-scale">`

- Modal dialog box:

The `.above-modal` class constrains the `.above` element to the center of the view (horizontally and vertically).
Its dimensions are shrinked to half its width by default but this behaviour can easily be customized:

`<div class="above above-top above-modal above-custom">`

```css
/* larger modal, positioned on 1/4th of the screen when visible */
.above-modal.above-custom {
    width: 70%;
}

.above-modal.above-custom.is-visible {
    top: calc(100% / 4);
}
```

#### Note:
If you are using Reveal Basis library via NPM, you can 

Global padding of `above` component has to be explicitly given through `$above-padding` variable in `_customization.scss` file as it is needed for positioning calculation.

The visibility state modifier class for an `above` element is `.is-visible`.

