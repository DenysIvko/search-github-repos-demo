import React, { memo } from 'react';
import cx from 'classnames';

const PaginateLetter = ({ onClick = null, active = false, letter, text = '' }) => {
  const clickable = Boolean(onClick);
  const clickHandlerProps = clickable ? { onClick } : {};
  const Tag = clickable ? 'button' : 'div';
  return (
    <Tag
      className={cx('Pagination__box', {
        'Pagination__box--clickable': clickable && !active,
        'Pagination__box--active': active
      })}
      {...clickHandlerProps}
    >
      <i className={`Pagination__icon Pagination__icon--${letter}`} />
      {text}
    </Tag>
  );
};

export default memo(PaginateLetter);
