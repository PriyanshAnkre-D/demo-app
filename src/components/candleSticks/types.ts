export type OhlcValueType = {
  open: number
  high: number
  low: number
  close: number
}

export type CandleItem = [
  mts: number,
  open: number,
  close: number,
  high: number,
  low: number,
  volume: number
]

export type PropType = {
  tickerValue: string
}
