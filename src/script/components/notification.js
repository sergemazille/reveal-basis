// default duration used for notifications already on DOM when the page is loaded
const NOTIFICATION_DURATION = 6000; // in milliseconds (0 for infinite duration)

export class Notification {

    // initialized on page load
    static init() {
        domInit();
        registerEvents();
    }

    // dynamic creation of a notification (after DOM is rendered)
    static create({
        // options defaults
        message = "",
        classes = [],
        direction = "left",
        duration = 0,
        dismissible = true
    }) {

        // set up notification
        let newNotification = document.createElement('div');
        newNotification.innerHTML = message;
        newNotification.classList.add('notification', `notification-${direction}`);

        // add custom classes
        [...classes].forEach(function(className) {
            newNotification.classList.add(className);
        });

        // add dismiss 'button' if need be
        if(dismissible) {
            let dismissButton = document.createElement('span');
            dismissButton.classList.add('dismiss');
            newNotification.appendChild(dismissButton);
        }

        // set notification duration if need be
        if(duration) {
            setDuration(newNotification, duration);
        }

        // add notification to view
        addToDom(newNotification);
    }
}

function domInit() {

    // create a notifications container
    let notificationsContainer = document.createElement('div');
    notificationsContainer.classList.add('notifications');

    // ...and append it on DOM
    document.querySelector('body').appendChild(notificationsContainer);

    // manage notifications already on DOM after page load
    createFromDom();
}

function createFromDom() {
    let notifications = document.querySelectorAll('.notification');
    [...notifications].forEach(
        (notification) => {
            addToDom(notification);
            setDuration(notification);
        });
}

function registerEvents() {

    // listen to a click event
    // as 'body' is the actual target, it will also work for notifications added after page initialization
    document.querySelector('body').addEventListener('click', function(e) {
        let trigger = e.target;

        // closing the notification
        // ========================

        // dismiss button has to be nested inside the notification
        if(trigger.classList.contains('dismiss') && trigger.closest('.notification')) {
            let notification = trigger.closest('.notification');
            removeFromDom(notification);
        }
    });
}

function removeFromDom(notification) {

    // hide animation thanks to css class
    notification.classList.remove('is-visible');
    notification.addEventListener('transitionend', remove);

    // executed after animation transition
    function remove() {

        // remove notification from DOM
        notification.parentNode.removeChild(notification);

        // detach event
        notification.removeEventListener('transitionend', remove)
    }
}

function addToDom(notification) {

    // add notification to notifications container (created in 'domInit' function)
    let notificationsContainer = document.querySelector('.notifications');
    notificationsContainer.appendChild(notification);

    // display notifications (with a small delay to allow animation to kick off)
    setTimeout(function() {
        displayNotification();
    }, 150);

    // display notification thanks to css class
    function displayNotification() {
        notification.classList.add('is-visible');
    }
}

// notification will be removed after some duration (unless duration is set to '0')
function setDuration(notification, duration = NOTIFICATION_DURATION) {
    if(duration) {
        setTimeout(function() {
            removeFromDom(notification)
        }, duration);
    }
}
