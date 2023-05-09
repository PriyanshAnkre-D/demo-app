export type TickerTableResponse = [
  symbol: string,
  bid: number,
  bidSize: number,
  ask: number,
  askSize: number,
  dailyChange: number,
  dailyChangeRelative: number,
  lastPrice: number,
  volume: number,
  high: number,
  low: number
]

export type Ticker = {
  name: string
  currency: string
  volume: number
  dailyChangeRelative: number
  lastPrice: number
}

export type PropType = {
  onClick: (arg: string) => void
}
