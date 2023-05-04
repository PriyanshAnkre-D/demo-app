import dynamic from 'next/dynamic'
import React, { FC, ReactElement } from 'react'
import { TITLE } from '../../constants/orderBook'
import styles from './orderBook.module.css'
const Table = dynamic(import('../../components/tableWrapper'))

const index: FC = (): ReactElement => {
  return (
    <>
      <div className={styles.container}>{TITLE}</div>
      <Table />
    </>
  )
}

export default index
