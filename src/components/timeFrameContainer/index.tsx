import React, { FC } from 'react'
import styles from './timeFrameContainer.module.css'
import { candleSticks } from '../../constants/ohlc'
import { PropType } from '../../types/timeFrameContainer'

export const TimeFrameContainer: FC<PropType> = ({ onClick }) => {
  return (
    <div className={styles.flex}>
      {candleSticks.TIME_FRAME.map((item) => (
        <div className={styles.timerItems} onClick={() => onClick(item.value)}>
          {item.label}
        </div>
      ))}
    </div>
  )
}
