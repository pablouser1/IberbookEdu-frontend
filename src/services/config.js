// API request url from user choise
function getServer() {
    if (localStorage.servers) {
        return JSON.parse(localStorage.servers).active
    }
    else {
        return null
    }
}

export var BASE_URL = getServer()
console.log(BASE_URL)
