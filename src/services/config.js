// Custom option, use predifined url
export const predifined_url = "https://pablouser1.ddns.net/IberbookEdu"
// API request url from user choise
function getServer() {
    if (predifined_url) {
        return predifined_url
    }

    if (localStorage.servers) {
        return JSON.parse(localStorage.servers).active
    }
    else {
        return null
    }
}

export var BASE_URL = getServer()
console.log(BASE_URL)
