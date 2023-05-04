export type OhlcValueType = {
  open: number | null
  high: number | null
  low: number | null
  close: number | null
}

export type CandleItem = [
  mts: number,
  open: number,
  close: number,
  high: number,
  low: number,
  volume: number
]
