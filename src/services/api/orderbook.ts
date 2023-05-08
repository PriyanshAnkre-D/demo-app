export const createWebSocket = (
  url: string,
  msg: string,
  onMessage: (arg0: MessageEvent) => void
) => {
  const ws = new WebSocket(url)
  ws.onopen = () => {
    ws.send(msg)
  }
  ws.onmessage = (event) => {
    const response = JSON.parse(event.data)
    onMessage(response)
  }
  return ws
}
