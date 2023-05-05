import { useRouter } from 'next/router'
import { FC, ReactElement } from 'react'
import { OHLC, ORDER_BOOK } from '../constants/dashboard'

const DashBoard: FC = (): ReactElement => {
  const router = useRouter()
  return (
    <>
      <button onClick={() => router.push('./ohlc')}>{OHLC}</button>
      <button onClick={() => router.push('./order-book')}>{ORDER_BOOK}</button>
    </>
  )
}

export default DashBoard
