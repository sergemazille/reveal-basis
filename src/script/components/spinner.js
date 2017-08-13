import { Overlay } from './overlay';

export class Spinner {

    static init() {

        // create a #spinner element
        this.spinner = document.createElement('div');
        this.spinner.setAttribute('id', 'spinner');

        // create 3 spinner items
        for(let i=0; i<3; i++) {
            let item = document.createElement('div');
            item.classList.add(`spinner-${i}`);
            this.spinner.appendChild(item);
        }

        // append spinner on DOM
        document.querySelector('body').appendChild(this.spinner);
    }

    static show() {
        Overlay.lock();
        Overlay.show();
        this.spinner.classList.add('is-visible');
    }

    static hide() {
        Overlay.hide();
        this.spinner.classList.remove('is-visible');
    }
}
