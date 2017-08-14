# Reveal Basis

Reveal Basis is a 'no dependencies' UI Kit which provides a set of tools to ease the front end developer job.

## Installation

### Regular `<script>` tag

Copy the `reveal-basis.min.js` file that you will find in `dist` folder into your own project folder (eg. `lib/reveal-basis.min.js`)
Just refer to the library with a regular `<script>` tag before your page `body` closing tag (`</body>`):
```html
<body>
[...]
<script src="lib/reveal-basis.min.js"></script>
</body>
```

You can test if the library setup is fine with an `above` component:
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

Reveal Basis is also available as a NPM package.
To download and install it locally in your `node_modules` folder, just type this command within your project root folder:

`npm install --save reveal-basis`

You will then be able to refer to it in your own script files the ES6 way:
```typescript
// script.js
import * as reveal from 'reveal-basis';

reveal.notification.create({
    message: "Hello World!",
    duration: 3000 // in milliseconds
});

```

### Note on installation

You shouldn't use `<script>` **and** NPM install, both in your project as it will initialize `spinner` and `overlay` elements twice.
