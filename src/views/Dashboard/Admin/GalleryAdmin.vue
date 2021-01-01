<i18n>
{
    "en": {
        "photos": "photos",
        "videos": "videos",
        "draghere": "Drag {type} here or click to upload",
        "description": "Description of the {type}",
        "overwrite": "Overwrite",
        "send": "Send"
    },
    "es": {
        "photos": "las fotos",
        "videos": "los vídeos",
        "draghere": "Arrastra {type} aquí o haz click para subir",
        "description": "Descripción de {type}",
        "overwrite": "Sobrescribir",
        "send": "Enviar"
    }
}
</i18n>

<template>
    <div class="container">
        <div class="columns is-centered is-vcentered is-multiline">
            <div class="column is-narrow">
                <b-field>
                    <b-upload v-model="files.photos"
                        multiple
                        drag-drop
                        accept="image/gif,image/png,image/jpeg">
                        <section class="section">
                            <div class="content has-text-centered">
                                <p>
                                    <b-icon icon="upload" size="is-large"></b-icon>
                                </p>
                                <i18n path="draghere" tag="p">
                                    <template v-slot:type>
                                        <span>{{ $t("photos") }}</span>
                                    </template>
                                </i18n>
                            </div>
                        </section>
                    </b-upload>
                </b-field>
            </div>
            <div class="column is-narrow">
                <b-field>
                    <b-upload v-model="files.videos"
                        multiple
                        drag-drop
                        accept="video/mp4,video/webm">
                        <section class="section">
                            <div class="content has-text-centered">
                                <p>
                                    <b-icon icon="upload" size="is-large"></b-icon>
                                </p>
                                <i18n path="draghere" tag="p">
                                    <template v-slot:type>
                                        <span>{{ $t("videos") }}</span>
                                    </template>
                                </i18n>
                            </div>
                        </section>
                    </b-upload>
                </b-field>
            </div>
        </div>
        <div class="columns is-centered is-vcentered is-multiline">
            <div v-if="files.photos.length" class="column is-narrow">
                <i18n path="description" tag="p">
                    <template v-slot:type>
                        <span>{{ $t("photos") }}</span>
                    </template>
                </i18n>
                <div class="columns is-multiline">
                    <div class="column is-narrow" v-for="(photo, index) in files.photos" v-bind:key="'photo' + index">
                        <b-field :label="photo.name">
                            <b-input v-model="photos_descriptions[index]"></b-input>
                        </b-field>
                    </div>
                </div>
            </div>
            <div v-if="files.videos.length" class="column is-narrow">
                <i18n path="description" tag="p">
                    <template v-slot:type>
                        <span>{{ $t("videos") }}</span>
                    </template>
                </i18n>
                <div class="columns is-multiline">
                    <div class="column is-narrow" v-for="(video, index) in files.videos" v-bind:key="'video' + index">
                        <b-field :label="video.name">
                            <b-input v-model="videos_descriptions[index]"></b-input>
                        </b-field>
                    </div>
                </div>
            </div>
        </div>
        <div class="field">
            <b-checkbox v-model="overwrite">{{ $t("overwrite") }}</b-checkbox>
        </div>
        <b-button @click="sendGallery">{{ $t("send") }}</b-button>
    </div>
</template>

<script>
import { uploadGallery } from "@/services/admin.js"
export default {
    name: "GalleryAdmin",
    data() {
        return {
            files: {
                photos: [],
                videos: []
            },
            overwrite: false,
            photos_descriptions: [],
            videos_descriptions: []
        }
    },
    methods: {
        sendGallery: function() {
            const newGallery = uploadGallery(this.files, this.overwrite, this.photos_descriptions, this.videos_descriptions)
            if (newGallery.code !== "C") {
                this.$buefy.toast.open("Error al subir")
            }
            else {
                this.$buefy.toast.open("Subido con éxito")
            }
        }
    }
}
</script>
