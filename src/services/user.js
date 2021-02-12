import { requests } from "./api.js"
import fileUpload from "./fileUpload.js"
export async function setProfile(schoolindex, groupindex) {
    let formData = new FormData();
    formData.append("schoolindex", schoolindex)
    formData.append("groupindex", groupindex)
    const res = await requests("manageProfiles.php?action=set", "POST", formData)
    return res
}

// Get uploads of user
export async function getProfileUploads() {
    const res = await requests("users/getProfile.php", "GET", null)
    return res.data
}

export async function getGroupData() {
    const res = await requests("users/getGroup.php", "GET", null)
    return res.data
}

// Get gallery from group
export async function getGroupGallery() {
    const res = await requests("gallery/getGallery.php", "GET", null)
    return res.data
}

export async function handleMediaUpload(media, type) {
    var uploader = new fileUpload(media, type)
    const res = await uploader.loop()
    return res
}

export async function handleMiscUpload(input) {
    let formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
        if (value) {
            formData.append(key, value)
        }
    });
    const res = await requests("users/uploadMisc.php", "POST", formData)
    return res
}

export async function setVote(id) {
    const params = new URLSearchParams();
    params.append('id', id);
    const res = await requests("vote.php", "POST", params)
    return res
}

export async function getYearbook() {
    const res = await requests("yearbooks/getYearbooks.php?mode=user", "GET", null)
    return res.data
}
