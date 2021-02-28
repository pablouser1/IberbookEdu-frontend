<i18n>
{
    "en": {
        "photos": "photos",
        "videos": "videos",
        "draghere": "Drag {type} here or click to upload",
        "description": "Description of the {type}",
        "overwrite": "Overwrite",
        "send": "Send",
        "error": "Error when uploading",
        "success": "Uploading successfully"
    },
    "es": {
        "photos": "las fotos",
        "videos": "los vídeos",
        "draghere": "Arrastra {type} aquí o haz click para subir",
        "description": "Descripción de {type}",
        "overwrite": "Sobrescribir",
        "send": "Enviar",
        "error": "Error al subir",
        "success": "Subido con éxito"
    }
}
</i18n>

<template>
    <div class="container">
        <div class="columns is-centered is-vcentered is-multiline">
            <div class="column is-half">
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
                <div class="tags">
                    <span v-for="(file, index) in files.photos"
                        :key="index"
                        class="tag is-primary" >
                        {{file.name}}
                        <button class="delete is-small" type="button" @click="deletePhoto(index)"></button>
                    </span>
                </div>
            </div>
            <div class="column is-half">
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
                <div class="tags">
                    <span v-for="(file, index) in files.videos"
                        :key="index"
                        class="tag is-primary" >
                        {{file.name}}
                        <button class="delete is-small" type="button" @click="deleteVideo(index)"></button>
                    </span>
                </div>
            </div>
        </div>
        <UploadProgress v-if="fileUploading.isActive" :progress="fileUploading"></UploadProgress>
        <div class="field">
            <b-switch v-model="overwrite">{{ $t("overwrite") }}</b-switch>
        </div>
        <b-button @click="startUpload">{{ $t("send") }}</b-button>
    </div>
</template>

<script>
import UploadProgress from "@/components/UploadProgress.vue"
import fileUpload from "@/services/fileUpload.js"
import { deleteGallery } from "@/services/admin.js"
export default {
    name: "GalleryAdmin",
    components: { UploadProgress },
    data() {
        return {
            files: {
                photos: [],
                videos: []
            },
            overwrite: false,
            isUploading: false,
            fileUploading: {
                isActive: false,
                current: 0,
                total: 0,
                type: ""
            }
        }
    },
    methods: {
        deletePhoto(index) {
            this.files.photos.splice(index, 1)
        },
        deleteVideo(index) {
            this.files.videos.splice(index, 1)
        },
        startUpload: async function() {
            this.isUploading = true
            if (this.overwrite) {
                const isDeleted = await deleteGallery();
                if (isDeleted.code !== "C") {
                    this.$buefy.toast.open({
                        duration: 3000,
                        message: isDeleted.error,
                        position: 'is-bottom',
                        type: 'is-danger'
                    })
                }
            }
            await this.uploadData()
            this.isUploading = false
        },
        async uploadData() {
            if (this.files.photos || this.files.videos) {
                this.fileUploading.isActive = true
                if (this.files.photos) {
                    for (let i=0; i<this.files.photos.length; i++) {
                        await this.uploadMedia(this.files.photos[i], "photo")
                    }
                }
                if (this.files.videos) {
                    for (let i=0; i<this.files.videos.length; i++) {
                        await this.uploadMedia(this.files.videos[i], "video")
                    }
                }
                this.fileUploading.isActive = false
            }
        },
        async uploadMedia(media, type) {
            var fileClass = new fileUpload(media, type, "/gallery/uploadMedia.php");
            this.fileUploading.total = fileClass.NUM_CHUNKS
            this.fileUploading.type = type
            while (fileClass.start < fileClass.SIZE) {
                this.fileUploading.current = fileClass.num
                let res = await fileClass.send()
                if (!res || res.code === "E") {
                    break;
                }
            }
        }
    }
}
</script>
