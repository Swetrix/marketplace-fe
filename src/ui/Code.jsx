import React, { memo } from 'react'
import PropTypes from 'prop-types'
import cx from 'clsx'

const Code = ({ text, className, language }) => (
  <pre className={cx('w-full rounded-md bg-slate-900 dark:bg-gray-750', className)}>
    <code className={`whitespace-pre-wrap language-${language}`}>{text}</code>
  </pre>
)

Code.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]).isRequired,
  language: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Code.defaultProps = {
  className: '',
}

export default memo(Code)
