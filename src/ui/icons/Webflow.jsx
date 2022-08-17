import React from 'react'
import cx from 'clsx'
import PropTypes from 'prop-types'

const Webflow = ({ theme, className }) => (
  <svg
    className={className}
    x='0px'
    y='0px'
    viewBox='0 0 808.3 203.3'
  >
    <title>
      Webflow
    </title>
    <path
      className={cx({
        'fill-white': theme === 'dark',
        'fill-slate-800': theme === 'light',
      })}
      d='M261,79.5c0-14.5-14.1-29.9-38.5-29.9c-27.4,0-57.5,20.1-62.1,60.2c-4.7,40.5,20.5,58.5,45.9,58.5
  s38.7-9.9,52.3-23.1c-11.7-14.7-26.8-7.9-29.7-6.4c-3.2,1.6-7.3,3.8-15.7,3.8c-9.8,0-19.8-4.4-19.8-22.7
  C256.2,113.7,261,94,261,79.5z M229.9,81.9c-0.4,4.5-2.2,12.2-34,16.5c6.7-23.8,19.5-25.6,25.4-25.6
  C226.8,72.8,230.3,77.1,229.9,81.9z M123.5,85.8c0,0-13.5,42.4-14.6,45.9C108.5,128.1,98.6,52,98.6,52c-23,0-35.3,16.4-41.8,33.7
  c0,0-16.4,42.5-17.8,46.1c-0.1-3.3-2.5-45.6-2.5-45.6C35.1,65,15.7,52.1,0,52.1l19,115.3c24.1-0.1,37.1-16.4,43.9-33.7
  c0,0,14.5-37.5,15.1-39.2c0.1,1.6,10.4,72.9,10.4,72.9c24.2,0,37.2-15.3,44.2-32l33.9-83.3C142.6,52.1,130,68.4,123.5,85.8z
   M349.8,49.4c-14.9,0-26.3,8.1-35.9,20v-0.1L322.5,0c-19.8,0-35.9,17.2-39,42.8l-15,123.7c11.4,0,23.5-3.3,30-11.7
  c5.8,7.5,14.5,13.5,27.4,13.5c33.4,0,56.3-38.8,56.3-75.2C382,59.9,365.9,49.4,349.8,49.4z M346.7,108.9
  c-3.5,20.3-14.8,34.1-25.7,34.1c-11,0-15.7-4.9-15.7-4.9c2.1-17.8,3.4-28.7,7.4-38.1c4-9.4,13.5-24.4,23.4-24.4
  C345.8,75.6,350.2,88.5,346.7,108.9z M465.6,52.1h-23.3l0.1-1.2c1.6-15.2,5.2-23.2,17.1-24.5c8.1-0.8,11.7-5,12.6-9.6
  c0.7-3.6,2.9-16.1,2.9-16.1c-46.8-0.3-61.5,19.9-65.3,50.7l-0.1,0.7h-0.5c-7.6,0-16,8.6-17.4,19.5l-0.5,4h15.6l-13.1,108.2l-4,19.4
  c0.5,0,1.1,0.1,1.6,0.1c21.9-0.8,35.9-18.1,39-43.2l10.2-84.5h7.3c7.2,0,15.6-7.2,17.1-19.2L465.6,52.1z M586.8,50.1
  c-26.9,0-52.3,19.8-60.1,50.9s4,67.9,43.6,67.9c39.5,0,62.3-38.3,62.3-70.2C632.6,67,611.1,50.1,586.8,50.1z M597.7,107.9
  c-1.4,14.1-7.6,35.5-24.6,35.5c-17.1,0-14.7-25-13-36.9c1.8-12.7,8.9-30.8,24.2-30.8C598,75.7,599.3,92,597.7,107.9z M765.5,85.8
  c0,0-13.5,42.4-14.6,45.9c-0.4-3.6-10.3-79.7-10.3-79.7c-23,0-35.3,16.4-41.8,33.7c0,0-16.4,42.5-17.8,46.1
  c-0.1-3.3-2.5-45.6-2.5-45.6C677.1,65,657.7,52.1,642,52.1l18.9,115.3c24.1-0.1,37.1-16.4,43.9-33.7c0,0,14.5-37.5,15-39.2
  c0.1,1.6,10.4,72.9,10.4,72.9c24.2,0,37.2-15.3,44.2-32l33.9-83.3C784.5,52.1,771.9,68.4,765.5,85.8z M487.6,0.7L468,158.8l0,0
  l-4,19.5c0.5,0,1.1,0.1,1.6,0.1l0,0c21.1-0.3,36.1-18.8,38.9-42.1l11.3-90.7C519.2,17.9,502.7,0.7,487.6,0.7z'
    />
  </svg>
)

Webflow.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.string.isRequired,
}

Webflow.defaultProps = {
  className: '',
}

export default Webflow
