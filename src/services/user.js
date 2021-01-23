import { requests } from "./api.js"

export async function setProfile(schoolindex, groupindex) {
    let formData = new FormData();
    formData.append("schoolindex", schoolindex)
    formData.append("groupindex", groupindex)
    const res = await requests("profiles.php?action=set", "POST", formData)
    return res
}

// Get uploads of user
export async function getProfileUploads() {
    const res = await requests("users/getprofileinfo.php", "GET", null)
    return res.data
}

export async function getGroupData() {
    const res = await requests("users/getgroupinfo.php", "GET", null)
    return res.data
}

export async function setNewInfo(schoolid, group) {
    let formData = new FormData();
    formData.append("schoolid", schoolid)
    formData.append("group", group)
    const res = await requests("setnewinfo.php", "POST", formData)
    return res
}
// Get gallery from group
export async function getGroupGallery() {
    const res = await requests("gallery/getgallery.php", "GET", null)
    return res.data
}

export async function handleUpload(input) {
    let formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
        if (value) {
            formData.append(key, value)
        }
    });
    const res = await requests("users/upload.php", "POST", formData)
    return res
}

export async function setVote(id) {
    const params = new URLSearchParams();
    params.append('id', id);
    const res = await requests("vote.php", "POST", params)
    return res
}

export async function getYearbook() {
    const res = await requests("yearbooks.php?mode=user", "GET", null)
    return res.data
}
