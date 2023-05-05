export const fetchBookData = (
  msg: string,
  onMessage: (arg0: MessageEvent) => void
) => {
  const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
  ws.onopen = () => {
    ws.send(msg)
  }
  ws.onmessage = (event) => {
    const response = JSON.parse(event.data)
    onMessage(response)
  }
  return ws
}
