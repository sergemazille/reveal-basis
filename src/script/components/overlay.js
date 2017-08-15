// by default, overlay won't stay locked after transition
let lockable = false;

export class Overlay {

    // avoid overlay to be declared multiple times
    constructor() {
        if (! this.overlay) {
            this.init();
        } else {
            return this;
        }
    }

    init() {

        // create an #overlay element...
        this.overlay = document.createElement('div');
        this.overlay.setAttribute('id', 'overlay');

        // ...and append it on DOM
        this.body = document.querySelector('body');
        this.body.appendChild(this.overlay);

        registerEvents(this.overlay);
    }

    show() {

        // forbid body to be scrollable
        this.body.classList.add('is-locked');

        // overlay won't be clickable until 'transitionend' event
        this.overlay.classList.add('is-locked');

        // display overlay
        this.overlay.classList.add('is-visible');
    }

    hide() {

        // body is scrollable again
        this.body.classList.remove('is-locked');

        // hide overlay
        this.overlay.classList.remove('is-visible');

        // hide eventual locked cursor icon
        this.overlay.classList.remove('lock-cursor');
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
            overlay.classList.remove('lock-cursor');
            lockable = false;
        }

        // overlay is visible: remove temporary transitioning lock (unless overlay is lockable)
        if (overlay.classList.contains('is-visible') && ! lockable) {
            overlay.classList.remove('is-locked');
        }

        // overlay is visible: add locked cursor icon if need be
        if (overlay.classList.contains('is-visible') && lockable) {
            overlay.classList.add('lock-cursor');
        }
    });
}
