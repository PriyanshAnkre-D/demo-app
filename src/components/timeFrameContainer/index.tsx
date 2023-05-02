import React from 'react'
import styles from './timeFrameContainer.module.css';

type Props = {
  onClick : any
}

export const TimeFrameContainer = ({onClick}:Props) => {
  const timeValues = [
    {
      label : '3y',
      value: '1W'
    },
    {
      label : '1y',
      value: '1D'
    },
    {
      label : '3m',
      value: '12h'
    },
    {
      label : '1m',
      value: '6h'
    },
    {
      label : '7d',
      value: '1h'
    },
    {
      label : '3d',
      value: '30m'
    },
    {
      label : '1d',
      value: '15m'
    },
    {
      label : '6h',
      value: '5m'
    },
    {
      label : '1h',
      value: '1m'
    }
  ]

  return (
    <div className={styles.flex}>
      {timeValues.map(item=>(
      <div className={styles.timerItems} onClick={()=>onClick(item.value)}>{item.label}</div>
      ))}
    </div>
  )
}
