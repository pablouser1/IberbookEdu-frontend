<i18n>
{
    "en": {
        "groupgallery": "Group's gallery"
    },
    "es": {
        "groupgallery": "Galería de tu grupo"
    }
}
</i18n>
<template>
    <div>
        <p class="title has-text-centered">
            <b-icon icon="image-album" size="is-medium"></b-icon>
            <span>{{ $t("groupgallery") }}</span>
        </p>
        <div class="columns is-centered is-vcentered">
            <div v-for="item in gallery" v-bind:key="item.id" class="column is-one-quarter-desktop">
                <b-image v-if="item.type === 'picture'" :src="baseurl + '/gallery/getitem.php?id=' + item.id"></b-image>
                <video controls v-else>
                    <source :src="baseurl + '/gallery/getitem.php?id=' + item.id">
                </video>
                <figcaption>{{ item.description }}</figcaption>
            </div>
        </div>
    </div>
</template>

<script>
import { getGroupGallery } from "@/services/user.js"
import { BASE_URL } from "@/services/config.js"
export default {
    name: "Gallery",
    data() {
        return {
            gallery: null,
            baseurl: BASE_URL
        }
    },
    created: async function() {
        this.gallery = await getGroupGallery()
    }
}
</script>
