export const getCandleSticks = async (timeFrame: string) => {
  try {
    const response = await fetch(
      `candles/trade:${timeFrame}:tBTCUSD/hist?end=${new Date().getTime()}&limit=100`
    )
    return response.json()
  } catch (error) {
    console.error(error)
  }
}
