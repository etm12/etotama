import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

//

const imageDataBus = U.bus();

const imageData = U.toProperty(imageDataBus);

//
