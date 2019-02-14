import * as React from 'karet';
import * as U from 'karet.util';
import * as S from '@etotama/core.shared';

const Guide = ({ prefix, position }) => {
  const translateX = U.view([0, S.lenses.translateX], position);
  const translateY = U.view([1, S.lenses.translateY], position);

  const guidePropsFor = (prefix, type, transform) => ({
    className: U.cns(
      'c-canvas__guides',
      type,
      U.string`prefix-${prefix}`,
    ),
    style: { transform },
  });

  return (
    <React.Fragment>
      <div {...guidePropsFor(prefix, 'vertical', translateX)} />
      <div {...guidePropsFor(prefix, 'horizontal', translateY)} />
    </React.Fragment>
  );
};

const OffsetGuide = ({ offset }) => (
  <div
    className="c-canvas__offset-guide"
    style={{
      width: U.view(0, offset),
      height: U.view(1, offset),
    }}
  >
    Canvas offset: {U.stringify(offset)}
  </div>
);

export { Guide, OffsetGuide };
