import React, { ReactElement, FC } from 'react'
import styles from './table.module.css'
import { PropType } from '../../types/table'

const Table: FC<PropType> = ({ columns, data }): ReactElement => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((item, index) => (
              <th key={index} className={styles.column}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, columnIndex) => {
                const key = column.toLowerCase()
                return (
                  <td key={columnIndex} className={styles.tableData}>
                    {item[key as keyof typeof item]}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
