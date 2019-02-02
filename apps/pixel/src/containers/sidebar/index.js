import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import { saveAs } from 'file-saver';
import * as C from '../../components';
import { Store } from '../../context';
import actions from '../../actions';
import { createImageBlob } from '../../_image';

const saveImage = (imageData, width) => U.doPush(actions, () => U.thru(
  U.template([imageData, width]),
  U.takeFirst(1),
  U.flatMapLatest(([i, w]) => createImageBlob(i, w)),
  U.takeFirst(1),
  U.consume( b => { saveAs(b, 'test.png') } ),
  U.endWith(undefined),
));

const SidebarImpl = ({ canvas, imageData, width = U.view('width', canvas).log('width') }) =>
  <aside>
    <C.Panel title="File operations">
      <button onClick={U.actions(U.preventDefault, saveImage(imageData, width))}>
        Save image
      </button>

      <button>
        Load image
      </button>
    </C.Panel>

    <C.Panel title="Color statistics">
      <C.ColorStats imageData={imageData} />
    </C.Panel>
  </aside>;

const SidebarContainer = () =>
  <React.Fragment>
    <Store.Consumer>
      {({ state, imageData }) =>
        <SidebarImpl
          canvas={U.view('canvas', state)}
          imageData={imageData}
        />}
    </Store.Consumer>
  </React.Fragment>;

export default SidebarContainer;
