export class Drop {
    static init() {

        // register triggering events
        registerEvents();
    }

    static toggle(drop) {
        drop.classList.toggle('is-visible');
    }
}

function registerEvents() {

    let dropTriggers = document.querySelectorAll('[data-toggle="drop"]');

    [...dropTriggers].forEach(function(trigger) {
        trigger.addEventListener('click', toggle);
    });

    // events for drop-hover
    let dropGroups = document.querySelectorAll('.drop-group');

    [...dropGroups].forEach(function(group) {
        group.addEventListener('mouseenter', hover);
        group.addEventListener('mouseleave', hover);
    });
}

function toggle(e) {
    let trigger = e.target;
    let drop;

    // targeted 'drop' element is passed via data-target attribute
    if (trigger.dataset.target) {
        let dropSelector = trigger.dataset.target;
        drop = document.querySelector(dropSelector);
    }

    // targeted 'drop' element is passed via href attribute
    else if (trigger.getAttribute('href')) {
        let dropSelector = trigger.getAttribute('href');
        drop = document.querySelector(dropSelector);
    }

    // targeted 'drop' element belongs to the same '.drop-group' than trigger
    else {
        let dropGroup = trigger.closest('.drop-group');

        if (dropGroup) {
            drop = dropGroup.querySelector('.drop');
        }
    }

    // toggle 'drop' element (unless it is a 'drop-hover' one)
    if (drop && ! drop.classList.contains('--trigger-hover')) {
        Drop.toggle(drop);
    }
}

function hover(e) {
    let dropGroup = e.target;
    let dropHover = dropGroup.querySelector('.--trigger-hover');

    if (dropHover) {
        Drop.toggle(dropHover);
    }
}
