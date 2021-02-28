import { requests } from "./api.js"

export async function deleteUserItems(id, deletedItems) {
    let formData = new FormData();
    formData.append("id", id)
    for (let i = 0; i<deletedItems.length; i++) {
        formData.append("elements[]", deletedItems[i])
    }
    const res = await requests("admins/deleteItems.php", "POST", formData)
    return res
}

export async function deleteGallery() {
    const res = await requests("gallery/resetGallery.php", "DELETE", null)
    return res
}

export async function uploadYearbook(theme, banner) {
    let formData = new FormData();
    formData.append("theme", theme)
    formData.append("banner", banner)
    const res = await requests("admins/yearbooks/generate.php", "POST", formData)
    return res
}

export async function deleteYearbook() {
    const res = await requests("admins/yearbooks/delete.php", "DELETE", null)
    return res
}
