// API request url from user choise
console.log('Frontend base_url:')
console.log(process.env.BASE_URL)
export const BASE_URL = getServer()
console.log('Backend base_url:')
console.log(BASE_URL)

function getServer () {
  if (process.env.VUE_APP_SERVER) {
    return process.env.VUE_APP_SERVER
  } else {
    return null
  }
}
