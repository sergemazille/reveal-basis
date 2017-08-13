# Above

`above` component's purpose is to display an element above the current page content.

## Usage

The triggering element needs to contain `data-toggle="above"`.
An eventual closing element needs to have `.dismiss` class and to be inside the `above` element.

### triggered by a button with a data-target attribute:
```html
<button data-target="#targeted-above" data-toggle="above">Open</button>
<div id="targeted-above" class="above">
    Lorem ipsum dolor sit amet...
    <button class="dismiss">Close</button>
</div>
```

### triggered by an anchor:
```html
<a href="#targeted-above" data-toggle="above">Open</a>
<div id="targeted-above" class="above">
    Lorem ipsum dolor sit amet...
    <button class="dismiss">Close</button>
</div>
```

### triggered by a button inside an '.above-group' element:
```html
<div class="above-group">
    <button data-toggle="above">Open</button>
    <div class="above">
        Lorem ipsum dolor sit amet...
        <button class="dismiss">Close</button>
    </div>
</div>
```

## Modifiers
Default `above` behaviour can be extended by adding some classes:

- transition directions:

Instead of just popping above current page content, an `above` element can slide from/to a side of the view. 

Reveal Basis UI Kit supplied classes are `.above-top`, `.above-right`, `.above-bottom`, `.above-left`:

`<div class="above above-left">`


There is also an `.above-scale` modifier:

`<div class="above above-scale">`

- modal:

The `.above-modal` class constrains the `above` element to the center of the view (horizontally and vertically).
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

## Note:
Global padding of `above` component has to be explicitly given through `$above-padding` variable in `_customization.scss` file as it is needed for positioning calculation.

The visibility state modifier class for an `above` element is `.is-visible`.
