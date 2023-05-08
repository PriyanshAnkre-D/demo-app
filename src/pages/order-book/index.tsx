import dynamic from 'next/dynamic'
import React, { FC, ReactElement } from 'react'
import { TITLE } from '../../constants/orderBook'
import styles from './orderBook.module.css'
const OBTableWrapper = dynamic(import('../../components/tableWrapper'))

const OrderBookContainer: FC = (): ReactElement => {
  return (
    <>
      <div className={styles.container}>{TITLE}</div>
      <OBTableWrapper />
    </>
  )
}

export default OrderBookContainer
