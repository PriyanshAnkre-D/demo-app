import dynamic from 'next/dynamic'
import React, { FC } from 'react'

const OhlcDasboard: FC = () => {
  const CandleSticks = dynamic(import('../../components/candleSticks'), {
    ssr: false,
  })
  return <CandleSticks />
}

export default OhlcDasboard
