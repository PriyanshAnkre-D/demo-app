import { INITIAL_TRADING_PAIR } from '@/src/constants/ohlc'
import dynamic from 'next/dynamic'
import React, { FC, useState } from 'react'
import styles from './ohlc.module.css'
const CandleSticks = dynamic(import('../../components/candleSticks'), {
  ssr: false,
})
const TickersTable = dynamic(import('../../components/tickersTable'), {
  ssr: false,
})

const OhlcDasboard: FC = () => {
  const [tickerValue, setTickerValue] = useState<string>(INITIAL_TRADING_PAIR)
  return (
    <div className={styles.OhlcContainer}>
      <TickersTable onClick={(value) => setTickerValue(value)} />
      <CandleSticks tickerValue={tickerValue} />
    </div>
  )
}

export default OhlcDasboard
