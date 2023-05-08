import React, { FC, ReactElement, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './tableWrapper.module.css'
import { BookTableData } from './types'
import { COLUMN_LEFT, COLUMN_RIGHT } from '../../constants/orderBook'
import { createWebSocket } from '../../services/api/orderbook'
import { handleOBWebSocketResponse } from './utility'
const Table = dynamic(import('../table'))

const TableWrapper: FC = (): ReactElement => {
  const [orderBookDataLeft, setOrderBookDataLeft] = useState<BookTableData[]>(
    []
  )
  const [orderBookDataRight, setOrderBookDataRight] = useState<BookTableData[]>(
    []
  )

  const createTableData = (array: number[][]) => {
    let total = 0
    const isTableData = array.map((item: number[]) => {
      const [price, count, amount] = item
      total += Math.abs(amount)
      return {
        price,
        count,
        amount: parseFloat(Math.abs(amount).toFixed(4)),
        total: parseFloat(total.toFixed(4)),
      }
    })
    return isTableData
  }

  const updateTotal = (array: BookTableData[]) => {
    let total = 0
    return array.map((item) => {
      total += item.amount
      return {
        ...item,
        total: parseFloat(total.toFixed(4)),
      }
    })
  }

  const updateTableData = (
    previous: BookTableData[],
    newItem: BookTableData,
    price: number,
    amount: number
  ) => {
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

  useEffect(() => {
    const url = 'wss://api-pub.bitfinex.com/ws/2'
    const msg = JSON.stringify({
      event: 'subscribe',
      channel: 'book',
      symbol: 'tBTCUSD',
    })
    const socket = createWebSocket(url, msg, (response) => {
      handleOBWebSocketResponse(
        response,
        setOrderBookDataLeft,
        setOrderBookDataRight
      )
    })

    socket.onerror = (error) => {
      console.error(error)
      socket.close()
    }

    return () => {
      socket.close()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.container}>
      <Table columns={COLUMN_LEFT} data={orderBookDataLeft} />
      <Table columns={COLUMN_RIGHT} data={orderBookDataRight} />
    </div>
  )
}

export default TableWrapper
