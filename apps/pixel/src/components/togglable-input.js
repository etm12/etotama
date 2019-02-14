import * as React from 'karet';
import * as U from 'karet.util';

const classPrefix = 'c-input-togglable';

const TogglableInput = ({ className, data }) => {
  const { value, editing } = U.destructure(data);
  const prevValue = value.get();

  return (
    <div className={U.cns(
      classPrefix,
      className,
    )}>
      {U.ifElse(
        editing,
        <div className={U.string`${classPrefix}__edit-wrapper`}>
          <U.Input
            className={U.string`${classPrefix}__edit`}
            type="text"
            value={value}
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
