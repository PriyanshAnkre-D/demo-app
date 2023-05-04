import React, { FC } from 'react'
import styles from './timeFrameContainer.module.css'
import { candleSticks } from '../../constants/ohlc'
import { PropType } from './types'

export const TimeFrameContainer: FC<PropType> = ({ onClick }) => {
  return (
    <div className={styles.flex}>
      {candleSticks.TIME_FRAME.map((item, index) => (
        <div
          key={index}
          className={styles.timerItems}
          onClick={() => onClick(item.value)}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}
