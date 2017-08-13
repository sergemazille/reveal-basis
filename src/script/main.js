// CSS bundling import
import '../style/reveal-basis.scss';

// scripts imports
import { Overlay } from './components/overlay';
import { Above } from './components/above';
import { Notification } from './components/notification';
import { Drop } from './components/drop';
import { Spinner } from './components/spinner';

// components initialization
Overlay.init();
Above.init();
Notification.init();
Drop.init();
Spinner.init();

// add component to global scope
module.exports = {
    overlay: Overlay,
    above: Above,
    notification: Notification,
    drop: Drop,
    spinner: Spinner
};
