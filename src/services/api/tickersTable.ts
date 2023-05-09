import { get } from './method/get'

export const fetchTickers = () => {
  const url = 'tickers?symbols=ALL'
  return get(url)
}
