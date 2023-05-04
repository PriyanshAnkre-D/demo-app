import dynamic from 'next/dynamic'
import React, { FC } from 'react'

const index: FC = () => {
  const CandleSticks = dynamic(import('../../components/candleSticks'), {
    ssr: false,
  })
  return <CandleSticks />
}

export default index
