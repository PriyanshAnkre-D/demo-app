import { Ticker, TickerTableResponse } from './types'

export const handleTickerResponseData = (
  response: TickerTableResponse[]
): Ticker[][] => {
  const tickerName: string[] = []
  const newData: Ticker[] = (response || [])
    .map((item) => {
      const [symbol, , , , , , dailyChangeRelative, lastPrice, volume, , ,] =
        item
      const isSymbol = symbol.split(':').join('')
      const name = isSymbol.slice(1, 4)
      const currency = isSymbol.slice(4)
      if (!tickerName.includes(name)) {
        tickerName.push(name)
      }
      return {
        name,
        currency,
        volume,
        dailyChangeRelative,
        lastPrice,
      }
    })
    .filter(
      (item) =>
        (item.currency.length === 3 || item.currency.length === 4) &&
        item.name.length === 3
    )
  return createTickerTableArray(newData, tickerName)
}

const createTickerTableArray = (data: Ticker[], name: string[]) => {
  const result = name.map((item) => {
    return data.filter((dataItem) => dataItem.name === item)
  })
  return result
}
