import { requests } from "./api.js"

// Get response and data from server on startup
export async function startup(server) {
    const res = await requests(`${server}/welcome.php`, "GET", null)
    return res.data
}

// Login to backend
export async function login(logininfo) {
    const params = new URLSearchParams();
    params.append('username', logininfo.username);
    params.append('password', logininfo.password);
    params.append('type', logininfo.type);
    const res = requests("login.php", "POST", params)
    return res
}

// Logout of backend
export async function logout() {
    await requests("logout.php", "POST", null)
}

// Get yearbooks
export async function getYearbooks(offset, sort) {
    const res = await requests(`yearbooks/getYearbooks.php?offset=${offset}&sort=${sort}`, "GET", null)
    return res
}

// Get individual yearbook
export async function getYearbook(id) {
    const res = await requests(`yearbooks/getYearbooks.php?mode=id&id=${id}`, "GET", null)
    return res.data
}

export async function getThemes() {
    const res = await requests("themes/getThemes.php", "GET", null)
    return res.data
}

// Get random banner from yearbook
export async function getBanner() {
    const res = await requests("yearbooks/getBanner.php", "GET", null)
    return res
}
