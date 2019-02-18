import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

const classPrefix = 'c-input-togglable';

const TogglableInput = ({ className, data }) => {
  const { value, editing } = U.destructure(data);
  const prevValue = value.get();
  const dom = U.variable();

  const focusWhenActive = U.thru(
    editing,
    U.skipUnless(R.equals(true)),
    U.flatMapLatest(v => U.combine([v, dom], (_, el) => el)),
    U.consume(el => el.focus()),
  );

  return (
    <div className={U.cns(
      classPrefix,
      className,
    )}>
      {U.sink(U.parallel([
        focusWhenActive,
      ]))}
      {U.ifElse(
        editing,
        <div className={U.string`${classPrefix}__edit-wrapper`}>
          <input
            ref={U.refTo(dom)}
            className={U.string`${classPrefix}__edit`}
            onKeyDown={e => e.keyCode === 13 && editing.set(false)}
            type="text"
            value={value}
            onChange={e => value.set(e.target.value)}
          />
          <button
            className={U.string`${classPrefix}__edit-button`}
            onClick={() => {
              editing.set(false);
            }}
          >
            OK
          </button>
          <button
            className={U.string`${classPrefix}__edit-button`}
            onClick={() => {
              value.set(prevValue);
              editing.set(false);
            }}
          >
            Cancel
          </button>
        </div>,
        <div
          className={U.string`${classPrefix}__display`}
          onClick={U.doSet(editing, true)}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default TogglableInput;
