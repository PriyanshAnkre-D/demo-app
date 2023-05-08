import { get } from './method/get'

export const getCandleSticks = (timeFrame: string, tradingPair: string) => {
  const url = `candles/trade:${timeFrame}:${tradingPair}/hist?end=${new Date().getTime()}&limit=100`
  return get(url)
}
