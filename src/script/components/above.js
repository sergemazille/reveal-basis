import { Overlay } from './overlay';

export class Above {
    static init() {

        // create above's overlay
        this.overlay = new Overlay();

        // register triggering events
        registerEvents();
    }

    static show(above) {

        // show overlay if not explicitly forbidden
        if (! above.classList.contains('no-overlay')) {

            // lock overlay if need be
            if (above.classList.contains('is-locked')) {
                this.overlay.lock();
            }

            this.overlay.show();
        }

        above.classList.add('is-visible');
    }

    static hide(above) {
        above.classList.remove('is-visible');

        // if there are no other above element on view, the overlay has to be hidden as well
        if (! document.querySelectorAll('.above.is-visible').length) {
            this.overlay.hide();
        }
    }
}

function registerEvents() {

    // listen to a click event on a trigger element
    document.querySelector('body').addEventListener('click', function(e) {
        let clickedElement = e.target;

        // opening the 'above' element
        // ===========================

        // clicked element has to target explicitly an 'above' element
        if (clickedElement.dataset.toggle === 'above') {

            let above;

            // targeted 'above' element is passed via data-target attribute
            if (clickedElement.dataset.target) {
                let aboveSelector = clickedElement.dataset.target;
                above = document.querySelector(aboveSelector);
            }

            // targeted 'above' element is passed via href attribute
            else if (clickedElement.getAttribute('href')) {
                let aboveSelector = clickedElement.getAttribute('href');
                above = document.querySelector(aboveSelector);
            }

            // targeted 'above' element belongs to the same '.above-group' than trigger
            else {
                let aboveGroup = clickedElement.closest('.above-group');

                if (aboveGroup) {
                    above = aboveGroup.querySelector('.above');
                }
            }

            if (above) {
                Above.show(above);
            }
        }


        // closing the 'above' element
        // ===========================

        // dismiss button has to be nested inside the 'above' element
        if (clickedElement.classList.contains('dismiss') && clickedElement.closest('.above')) {
            let above = clickedElement.closest('.above');
            Above.hide(above);
        }


        // page's overlay was clicked
        if (clickedElement.id === 'overlay') {
            let overlay = clickedElement; // for ease of use

            // do nothing if overlay isn't visible or is locked
            if (! (overlay.classList.contains('is-visible')) || (overlay.classList.contains('is-locked'))) {
                return;
            }

            let aboves = document.querySelectorAll('.above');
            [...aboves].forEach(function(above) {
                Above.hide(above);
            });
        }
    });
}
