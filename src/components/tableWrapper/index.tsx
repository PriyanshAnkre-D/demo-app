import React, { FC, ReactElement, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './tableWrapper.module.css'
import { TableData } from './types'
import { column, columnReverse } from '../../constants/orderBook'
const Table = dynamic(import('../table'))

const TableWrapper: FC = (): ReactElement => {
  const [tableData, setTableData] = useState<TableData[]>([])
  const [tableDataReverse, setTableDataReverse] = useState<TableData[]>([])

  const createTableData = (array: number[][]) => {
    let total = 0
    const isTableData = array.map((item: number[]) => {
      const [price, count, amount] = item
      total += parseFloat(Math.abs(amount).toFixed(4))
      return {
        price,
        count,
        amount: parseFloat(Math.abs(amount).toFixed(4)),
        total,
      }
    })
    return isTableData
  }

  const updateTotal = (array: TableData[]) => {
    let total = 0
    return array.map((item) => {
      total += item.amount
      return {
        ...item,
        total: parseFloat(total.toFixed(4)),
      }
    })
  }

  const sortHelper = (a: TableData, b: TableData): number => {
    return a.price - b.price ? -1 : 1
  }

  const updateTableData = (
    previous: TableData[],
    newItem: TableData,
    price: number
  ) => {
    let priceValueIndex = -1
    priceValueIndex = previous.findIndex((item) => item.price === price)
    if (priceValueIndex === -1) {
      const isTableData = [...previous, newItem]
      isTableData.sort(sortHelper)
      const newData = updateTotal(isTableData)
      return newData.slice(0, 25)
    }
    const tempTableData = [...previous]
    tempTableData.splice(priceValueIndex, 1, newItem)
    return updateTotal(tempTableData)
  }

  useEffect(() => {
    const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
    const msg = JSON.stringify({
      event: 'subscribe',
      channel: 'book',
      symbol: 'tBTCUSD',
    })
    ws.onopen = () => {
      ws.send(msg)
    }
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data)
      if (Array.isArray(response)) {
        const [, isResponse] = response
        if (isResponse.length === 3) {
          const [price, count, amount] = isResponse

          const newItem: TableData = {
            price,
            amount: parseFloat(Math.abs(amount).toFixed(4)),
            count,
            total: 0,
          }
          if (amount > 0) {
            setTableData((previous: TableData[]) =>
              updateTableData(previous, newItem, price)
            )
          } else {
            setTableDataReverse((previous: TableData[]) =>
              updateTableData(previous, newItem, price)
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
          const newResponseReverse = (isResponse || []).filter(
            (item: number[]) => {
              const [, , amount] = item
              return amount < 0
            }
          )
          const newData = createTableData(newResponse)
          const newDataReverse = createTableData(newResponseReverse)
          setTableData(newData)
          setTableDataReverse(newDataReverse)
        }
      }
    }

    return () => {
      ws.close()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.container}>
      <Table columns={column} data={tableData} />
      <Table columns={columnReverse} data={tableDataReverse} />
    </div>
  )
}

export default TableWrapper
