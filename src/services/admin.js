import { requests } from "./api.js"

export async function uploadGallery(files, overwrite, photos_descriptions, videos_descriptions) {
    let formData = new FormData();
    formData.append("overwrite", overwrite)
    for (let i = 0; i<files.photos.length; i++) {
        formData.append("photos[]", files.photos[i])
    }
    for (let i = 0; i<files.videos.length; i++) {
        formData.append("videos[]", files.videos[i])
    }
    for (let i = 0; i<photos_descriptions.length; i++) {
        formData.append("photos_descriptions[]", photos_descriptions[i])
    }
    for (let i = 0; i<videos_descriptions.length; i++) {
        formData.append("videos_descriptions[]", videos_descriptions[i])
    }
    const res = await requests("gallery/upload.php", "POST", formData)
    return res.data
}

export async function getThemes() {
    const res = await requests("admins/yearbooks/getThemes.php", "GET", null)
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
