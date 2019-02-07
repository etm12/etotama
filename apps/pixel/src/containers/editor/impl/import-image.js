import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';
import * as S from '@etotama/core.shared';

const readFile = (reader, file) => U.thru(
  file,
  U.tapPartial(f => reader.readAsDataURL(f)),
  U.flatMapLatest(() => U.fromEvents(reader, 'load', L.get(['target', 'result']))),
  U.toProperty,
);

const CanvasReader = ({ image, data }) => {
  const dom = U.variable();
  const context = U.mapValue(el => el.getContext('2d'), dom);

  const actions = U.serializer(null);

  const convertImage = ev =>
    U.doPush(actions, () => U.thru(
      U.template([context, ev.target]),
      U.takeFirst(1),
      U.consume(([ctx, img]) => {
        ctx.drawImage(img, 0, 0);
        ctx.getImageData(0, 0, img.width, img.height);
      })
    ));

  return (
    <React.Fragment>
      <img
        src={image}
        onLoad={U.actions(S.persist)}
      />
      <canvas ref={U.refTo(dom)} />
    </React.Fragment>
  )
}

//

const ImportImage = ({ file, callback }) => {
  const reader = new FileReader();

  const setFile = U.through(
    L.get(['target', 'files', L.first]),
    U.doSet(file),
  );

  return (
    <div className="c-import-image">
      <input
        type="file"
        onChange={U.through(setFile, S.call0)}
      />
    </div>
  );
};

export default ImportImage;
