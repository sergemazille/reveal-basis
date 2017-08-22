let overlay;
let body;
let lockable = false;

export class Overlay {

    constructor() {

        // avoid multiple declarations
        if (! overlay) {

            // create an #overlay element...
            overlay = document.createElement('div');
            overlay.setAttribute('id', 'overlay');

            // ...and append it on DOM
            body = document.querySelector('body');
            body.appendChild(overlay);

        } else {
            return this;
        }
    }

    init() {
        registerEvents(overlay);
    }

    show() {

        // forbid body to be scrollable
        body.classList.add('is-locked');

        // overlay won't be clickable until 'transitionend' event
        overlay.classList.add('--cursor-locked');

        // display overlay
        overlay.classList.add('is-visible');
    }

    hide() {

        // body is scrollable again
        body.classList.remove('is-locked');

        // hide overlay
        overlay.classList.remove('is-visible');

        // hide eventual locked cursor icon
        overlay.classList.remove('--cursor-locked');
    }

    lock() {

        // overlay will remain locked after transition
        lockable = true;
    }
}

function registerEvents(overlay) {

    // watch for transition end
    overlay.addEventListener('transitionend', function() {

        // overlay is hidden: clean up
        if (! overlay.classList.contains('is-visible')) {
            overlay.classList.remove('is-locked');
            overlay.classList.remove('--cursor-locked');
            lockable = false;
        }

        // overlay is visible: remove temporary transitioning lock (unless overlay is lockable)
        if (overlay.classList.contains('is-visible') && ! lockable) {
            overlay.classList.remove('is-locked');
        }

        // overlay is visible: add locked cursor icon if need be
        if (overlay.classList.contains('is-visible') && lockable) {
            overlay.classList.add('--cursor-locked');
        }
    });
}
