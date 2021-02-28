import { requests } from "./api.js"

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

export async function handleMiscUpload(link, quote) {
    const formData = new FormData();
    formData.append("link", link)
    formData.append("quote", quote)
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

export async function getMessages(offset) {
    const res = await requests(`messages/getMessages.php?offset=${offset}`, "GET", null)
    return res
}

export async function changePassword(oldPassword, newPassword) {
    const formData = new FormData();
    formData.append("oldPassword", oldPassword)
    formData.append("newPassword", newPassword)    
    const res = await requests("changePassword.php", "POST", formData)
    return res
}
