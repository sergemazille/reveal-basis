// CSS bundling import
import '../style/reveal-basis.scss';

// scripts imports
import { Overlay } from './components/overlay';
import { Spinner } from './components/spinner';

import { Above } from './components/above';
import { Notification } from './components/notification';
import { Drop } from './components/drop';

// unique components creation
new Overlay().init();

// components initialization
Above.init();
Notification.init();
Drop.init();
Spinner.init();

// add components to global scope
module.exports = {
    overlay: Overlay,
    above: Above,
    notification: Notification,
    drop: Drop,
    spinner: Spinner
};
