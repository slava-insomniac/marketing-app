interface RequestOptions {
  url: string
  method?: 'GET' | 'POST'
  body?: object
  headers?: HeadersInit
}

async function requestAdapter({ url, body, method = 'GET', headers = {} }: RequestOptions) {
  const response = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: { ...headers, 'Content-Type': 'application/json' },
  })

  let responseData

  try {
    responseData = await response.json()
  } catch (e) {
    responseData = null
  }

  if (response.ok) {
    return responseData
  } else {
    const error = responseData || { message: 'Unknown error occurred' }
    throw new Error(error.message)
  }
}

export const request = {
  async get(url: string) {
    return requestAdapter({ url })
  },
  async post(url: string, body: object) {
    return requestAdapter({ url, body, method: 'POST' })
  },
}
