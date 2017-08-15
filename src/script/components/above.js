import { Overlay } from './overlay';

export class Above {
    static init() {

        // register triggering events
        registerEvents();
    }

    static show(above) {

        // show overlay if not explicitly forbidden
        if (! above.classList.contains('no-overlay')) {
            Overlay.show();
        }

        above.classList.add('is-visible');
    }

    static hide(above) {
        above.classList.remove('is-visible');

        // if there are no other above element on view, the overlay has to be hidden as well
        if(! document.querySelectorAll('.above.is-visible').length) {
            Overlay.hide();
        }
    }
}

function registerEvents() {

    // listen to a click event on a trigger element
    document.querySelector('body').addEventListener('click', function(e) {
        let trigger = e.target;


        // opening the 'above' element
        // ===========================

        // trigger has to target explicitly an 'above' element
        if(trigger.dataset.toggle === 'above') {

            let above;

            // targeted 'above' element is passed via data-target attribute
            if(trigger.dataset.target) {
                let aboveSelector = trigger.dataset.target;
                above = document.querySelector(aboveSelector);
            }

            // targeted 'above' element is passed via href attribute
            else if(trigger.getAttribute('href')) {
                let aboveSelector = trigger.getAttribute('href');
                above = document.querySelector(aboveSelector);
            }

            // targeted 'above' element belongs to the same '.above-group' than trigger
            else {
                let aboveGroup = trigger.closest('.above-group');

                if(aboveGroup) {
                    above = aboveGroup.querySelector('.above');
                }
            }

            if(above) {
                Above.show(above);
            }
        }


        // closing the 'above' element
        // ===========================

        // dismiss button has to be nested inside the 'above' element
        if(trigger.classList.contains('dismiss') && trigger.closest('.above')) {
            let above = trigger.closest('.above');
            Above.hide(above);
        }
    });


    // listen for a click event on the overlay element to hide every visible 'above' elements
    let overlay = document.querySelector('#overlay');

    overlay.addEventListener('click', function() {

        // do nothing if overlay isn't visible or is locked
        if(! (overlay.classList.contains('is-visible')) || (overlay.classList.contains('is-locked'))) {
            return;
        }

        let aboves = document.querySelectorAll('.above');
        [...aboves].forEach(function(above) {
            Above.hide(above);
        });
    });
}
