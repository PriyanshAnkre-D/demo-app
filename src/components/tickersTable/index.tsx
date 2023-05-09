import { fetchTickers } from '@/src/services/api/tickersTable'
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { PropType, Ticker, TickerTableResponse } from './types'
import styles from '@/src/components/table/table.module.css'
import tickerStyle from './tickersTable.module.css'
import { COLUMNS } from '@/src/constants/ticker'
import { handleTickerResponseData } from './utility'

const TickersTable: FC<PropType> = ({ onClick }): ReactElement => {
  const [tickersTable, setTickersTable] = useState<Ticker[][]>([])

  const fetchTickersTableData = async () => {
    const response: TickerTableResponse[] = await fetchTickers()
    setTickersTable(handleTickerResponseData(response))
  }

  useEffect(() => {
    fetchTickersTableData()
  }, [])

  return (
    <div className={tickerStyle.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {COLUMNS.map((item, index) => (
              <th key={index} className={styles.column}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tickersTable.map((item) => {
            return (
              <>
                {item.map((elem, index) => {
                  const isCurrency =
                    elem.currency.slice(0, 3) +
                    elem.currency.slice(3).toLocaleLowerCase()
                  const isRelativeChange = parseFloat(
                    (elem.dailyChangeRelative * 100).toFixed(2)
                  )
                  return (
                    <tr onClick={() => onClick(elem.name+elem.currency)}>
                      {index === 0 ? (
                        <td className={styles.tableData}>{elem.name}</td>
                      ) : (
                        <td></td>
                      )}
                      <td className={styles.tableData}>
                        {elem.lastPrice} {isCurrency}
                      </td>
                      <td
                        className={`${styles.tableData} ${
                          isRelativeChange > 0
                            ? tickerStyle.greenText
                            : tickerStyle.redText
                        }`}
                      >
                        {Math.abs(isRelativeChange)}
                      </td>
                      <td className={styles.tableData}>{elem.volume}</td>
                    </tr>
                  )
                })}
              </>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TickersTable
