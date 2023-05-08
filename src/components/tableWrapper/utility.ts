import { BookTableData } from './types'

const convertToProperDecimal = (value: number) => {
  return parseFloat(value.toFixed(4))
}

const createTableData = (array: number[][]) => {
  let total = 0
  const isTableData = array
    .map((item: number[]) => {
      const [price, count, amount] = item
      total += Math.abs(amount)
      return {
        price,
        count,
        amount: convertToProperDecimal(Math.abs(amount)),
        total: convertToProperDecimal(total),
      }
    })
    .filter((item) => item.count !== 0)
  return isTableData
}

const updateTotal = (array: BookTableData[]): BookTableData[] => {
  let total = 0
  return array
    .map((item) => {
      total += item.amount
      return {
        ...item,
        total: convertToProperDecimal(total),
      }
    })
    .filter((item) => item.count !== 0)
}

const updateTableData = (
  previous: BookTableData[],
  newItem: BookTableData,
  price: number,
  amount: number
): BookTableData[] => {
  let priceValueIndex = -1
  priceValueIndex = previous.findIndex((item) => item.price === price)
  if (priceValueIndex === -1) {
    const isTableData = [...previous, newItem]
    isTableData.sort((a, b) => {
      const result = a.price - b.price
      return amount > 0 ? -result : result
    })
    const newData = updateTotal(isTableData)
    return newData.slice(0, 25)
  }
  const tempTableData = [...previous]
  tempTableData.splice(priceValueIndex, 1, newItem)
  return updateTotal(tempTableData)
}

export const handleOBWebSocketResponse = (
  response: MessageEvent<any>,
  setOrderBookDataLeft: (
    arg: ((args: BookTableData[]) => BookTableData[]) | BookTableData[]
  ) => void,
  setOrderBookDataRight: (
    arg: ((args: BookTableData[]) => BookTableData[]) | BookTableData[]
  ) => void
) => {
  if (Array.isArray(response)) {
    const [, isResponse] = response
    if (isResponse.length === 3) {
      const [price, count, amount] = isResponse

      const newItem: BookTableData = {
        price,
        amount: parseFloat(Math.abs(amount).toFixed(4)),
        count,
        total: 0,
      }
      if (count === 0) {
        return
      } else if (amount > 0) {
        setOrderBookDataLeft((previous: BookTableData[]) =>
          updateTableData(previous, newItem, price, amount)
        )
      } else {
        setOrderBookDataRight((previous: BookTableData[]) =>
          updateTableData(previous, newItem, price, amount)
        )
      }
    } else if (isResponse.length > 3) {
      const newResponse = (isResponse || [])
        .filter((item: number[]) => {
          const [, , amount] = item
          return amount > 0
        })
        .sort((a: number[], b: number[]) => {
          const [priceA] = a
          const [priceB] = b
          return priceA - priceB ? 1 : -1
        })
      const newResponseReverse = (isResponse || []).filter((item: number[]) => {
        const [, , amount] = item
        return amount < 0
      })
      const newData = createTableData(newResponse)
      const newDataReverse = createTableData(newResponseReverse)
      setOrderBookDataLeft(newData)
      setOrderBookDataRight(newDataReverse)
    }
  }
}
