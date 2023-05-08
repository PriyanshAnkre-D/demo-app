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
