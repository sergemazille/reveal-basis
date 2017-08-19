// check for a partial class name in a classList
export function classListIncludes(classList, string) {
    return classList.value.includes(string);
}

// convert milliseconds into css duration property (eg. 300 => .3s)
export function getCssDuration(milliseconds) {
    return (milliseconds / 1000 + 's');
}

// polyfills
export function polyfills() {

    // 'element.closest'
    if (typeof HTMLElement.prototype.closest === "undefined") {
        polyfillElementClosest();
    }
}

// see https://developer.mozilla.org/fr/docs/Web/API/Element/closest#Proth%C3%A8se_d'%C3%A9mulation_(polyfill)
function polyfillElementClosest() {
    HTMLElement.prototype.closest = function () {
        if (window.Element && !Element.prototype.closest) {
            Element.prototype.closest =
                function(s) {
                    let matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i,
                        el = this;
                    do {
                        i = matches.length;
                        while (--i >= 0 && matches.item(i) !== el) {};
                    } while ((i < 0) && (el = el.parentElement));
                    return el;
                };
        }
    }
}
