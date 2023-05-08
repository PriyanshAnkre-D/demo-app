import { ApexOptions } from 'apexcharts'
import { OhlcValueType } from './types'
import { CandleStick } from '../../constants/ohlc'

export const options = (
  setOhlcValue: (arg: OhlcValueType) => void,
  ohlcValue: OhlcValueType | null
): ApexOptions => ({
  chart: {
    type: 'candlestick',
    height: 350,
    events: {
      mouseMove(_0, _1, config) {
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
    text: `${CandleStick.TITLE} O:${ohlcValue?.open || ''} H:${
      ohlcValue?.high || ''
    } L:${ohlcValue?.low || ''} C:${ohlcValue?.close || ''}`,
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
})
