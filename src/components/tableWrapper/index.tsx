import dynamic from 'next/dynamic'
import React, { FC, ReactElement, useEffect, useState } from 'react'
import styles from './tableWrapper.module.css'
const Table = dynamic(import('../table'))

type TableData = {
  count: number
  amount: number
  total: number
  price: number
}

const index: FC = (): ReactElement => {
  const [tableData, setTableData] = useState<TableData[]>([])
  const [tableDataReverse, setTableDataReverse] = useState<TableData[]>([])
  const column = ['COUNT', 'AMOUNT', 'TOTAL', 'PRICE']
  const columnReverse = ['PRICE', 'TOTAL', 'AMOUNT', 'COUNT']

  const createTableData = (array: number[][]) => {
    let total = 0
    const isTableData = array.map((item: number[]) => {
      const [price, count, amount] = item
      total += Math.abs(amount)
      return {
        price,
        count,
        amount: Math.abs(amount),
        total,
      }
    })
    return isTableData
  }

  useEffect(() => {
    const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
    let msg = JSON.stringify({
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
        if (isResponse.length > 3) {
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
  }, [])
  console.log(tableData, tableDataReverse)

  return (
    <div className={styles.container}>
      <Table columns={column} data={tableData} />
      <Table columns={columnReverse} data={tableDataReverse} />
    </div>
  )
}

export default index
