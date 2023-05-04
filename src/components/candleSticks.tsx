import React, { FC, ReactElement, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { TimeFrameContainer } from './timeFrameContainer'
import { candleSticks } from '../constants/ohlc'
import { getCandleSticks } from '../services/api/candles'
import { CandleItem, OhlcValueType } from '../types/candleSticks'

const CandleSticks: FC = (): ReactElement => {
  const [candles, setCandles] = useState<number[][]>([])
  const [ohlcValue, setOhlcValue] = useState<OhlcValueType>({
    open: null,
    high: null,
    low: null,
    close: null,
  })
  const [timeFrame, setTimeFrame] = useState<string>(
    candleSticks.INITIAL_TIME_FRAME
  )
  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
      events: {
        mouseMove(e, chart, config) {
          const isData =
            config?.config?.series[0].data[config.dataPointIndex]?.y || []
          if (isData.length) {
            const [open, high, low, close] = isData
            setOhlcValue({ open, high, low, close })
          }
        },
      },
    },
    title: {
      text: `${candleSticks.TITLE} O:${ohlcValue.open || ''} H:${
        ohlcValue.high || ''
      } L:${ohlcValue.low || ''} C:${ohlcValue.close || ''}`,
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      opposite: true,
      labels: {
        formatter(value) {
          return parseInt(value.toString()).toString()
        },
      },
    },
    tooltip: {
      enabled: true,
      fixed: {
        enabled: true,
        position: 'topLeft',
      },
      custom() {
        return '<div style={{display:"none"}} />'
      },
    },
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  }
  useEffect(() => {
    getCandleSticks(timeFrame)
      .then((res) => {
        const updatedRes = (res || []).map((item: CandleItem) => {
          const [mts, open, close, high, low] = item
          return {
            x: mts,
            y: [open, high, low, close],
          }
        })
        setCandles(updatedRes)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }, [timeFrame])

  return (
    <>
      <Chart
        options={options}
        series={[{ data: candles }]}
        type="candlestick"
        height={350}
      />
      <TimeFrameContainer
        onClick={(isTimeFrame: string) => setTimeFrame(isTimeFrame)}
      />
    </>
  )
}

export default CandleSticks
