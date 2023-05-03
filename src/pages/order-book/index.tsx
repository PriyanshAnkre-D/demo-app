import dynamic from 'next/dynamic'
import React, { FC, ReactElement } from 'react'
import { TITLE } from '../../constants/orderBook'
const Table = dynamic(import('../../components/tableWrapper'))

const index: FC = (): ReactElement => {
  return (
    <>
      <label>{TITLE}</label>
      <Table />
    </>
  )
}

export default index
