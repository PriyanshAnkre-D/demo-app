import React, { FC, ReactElement, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { TimeFrameContainer } from '../timeFrameContainer'
import { CandleStick } from '../../constants/ohlc'
import { getCandleSticks } from '../../services/api/candles'
import { CandleItem, OhlcValueType, PropType } from './types'
import { options } from './utility'

const CandleSticks: FC<PropType> = ({ tickerValue }): ReactElement => {
  const [candles, setCandles] = useState<CandleItem[]>([])
  const [ohlcValue, setOhlcValue] = useState<OhlcValueType | null>(null)
  const [timeFrame, setTimeFrame] = useState<string>(
    CandleStick.INITIAL_TIME_FRAME
  )

  const fetchCandleSticks = async (
    timeFrame: string,
    tradingPair: string
  ): Promise<void> => {
    const response = await getCandleSticks(timeFrame, tradingPair)
    const updatedRes = (response || []).map((item: CandleItem) => {
      const [mts, open, close, high, low] = item
      return {
        x: mts,
        y: [open, high, low, close],
      }
    })
    setCandles(updatedRes)
  }

  useEffect(() => {
    fetchCandleSticks(timeFrame, tickerValue)
  }, [timeFrame, tickerValue])

  return (
    <div>
      <Chart
        options={options(setOhlcValue, ohlcValue)}
        series={[{ data: candles }]}
        type="candlestick"
        height={350}
      />
      <TimeFrameContainer
        onClick={(isTimeFrame: string) => setTimeFrame(isTimeFrame)}
      />
    </div>
  )
}

export default CandleSticks
