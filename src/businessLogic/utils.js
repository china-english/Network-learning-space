export function createReducer (initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type]

    return reducer
      ? reducer(state, action.payload)
      : state
  }
}

export function checkHttpStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  console.log(error)
  error.response = response
  throw error
}

export function parseJSON (response) {
  return response.json()
}

export const getObjectById = (objects, id) => {
  return objects.find(object => object.id === id)
}

export const createMarkup = (string) => {
  const newString = string.replace(/\n/g, '<br/>')
  return { __html: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + newString }
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const setParam = (paramString, param) => (param == '') ? '' : `${paramString}=${param}`
