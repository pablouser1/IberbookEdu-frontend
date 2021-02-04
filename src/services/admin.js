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

export async function uploadGallery(files, overwrite, photos_descriptions, videos_descriptions) {
    let formData = new FormData();
    formData.append("overwrite", overwrite)
    for (let i = 0; i<files.photos.length; i++) {
        formData.append("photos[]", files.photos[i])
        if (photos_descriptions[i]) {
            formData.append(`photos_descriptions[${i}]`, photos_descriptions[i])
        }
    }
    for (let i = 0; i<files.videos.length; i++) {
        formData.append("videos[]", files.videos[i])
        if (videos_descriptions[i]) {
            formData.append(`videos_descriptions[${i}]`, videos_descriptions[i])
        }
    }
    const res = await requests("gallery/upload.php", "POST", formData)
    return res.data
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
