import { Overlay } from './overlay';

let spinner;
let overlay = new Overlay();

export class Spinner {

    constructor() {

        // avoid multiple declarations
        if (! spinner) {

            // create a #spinner element
            spinner = document.createElement('div');
            spinner.setAttribute('id', 'spinner');

            // create 3 spinner items
            for(let i=0; i<3; i++) {
                let item = document.createElement('div');
                item.classList.add(`spinner-${i}`);
                spinner.appendChild(item);
            }

            // append spinner on DOM
            document.querySelector('body').appendChild(spinner);

        } else {
            return this;
        }
    }

    show() {
        overlay.lock();
        overlay.show();
        spinner.classList.add('is-visible');
    }

    hide() {
        overlay.hide();
        spinner.classList.remove('is-visible');
    }
}
