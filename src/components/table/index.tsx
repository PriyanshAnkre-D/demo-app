import React, { useState, useEffect, ReactElement, FC } from 'react'
import styles from './table.module.css'

type TableData = {
  count: number
  amount: number
  total: number
  price: number
}

type PropType = {
  columns: string[]
  data: TableData[]
}

const Table: FC<PropType> = ({ columns, data }): ReactElement => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((item) => (
              <th className={styles.column}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              {columns.map(column=>
              {
                const key = column.toLowerCase()
                return(
              <td className={styles.tableData}>{item[key as keyof typeof item]}</td>
              )})}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
