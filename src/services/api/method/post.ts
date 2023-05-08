export const post = async (url: string, headers = {}, body = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    })
    return response.json()
  } catch (error) {
    console.error(error)
  }
}
