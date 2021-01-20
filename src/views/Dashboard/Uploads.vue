<i18n>
{
    "en": {
        "info": "Your info",
        "link": "Open link",
        "upload": {
            "add": "Upload/Replace data",
            "photo": "Add photo",
            "video": "Add video",
            "quote": "Quote",
            "link": "Link",
            "send": "Send",
            "processed": "Your data has been processed successfully"
        }
    },
    "es": {
        "info": "Tus datos",
        "link": "Abrir enlace",
        "upload": {
            "add": "Subir/Reemplazar datos",
            "photo": "Agregar foto",
            "video": "Agregar vídeo",
            "quote": "Cita",
            "link": "Enlace",
            "send": "Enviar",
            "processed": "Tus datos se han procesado con éxito"
        }
    }
}
</i18n>

<template>
    <div>
        <p class="title has-text-centered">
            <b-icon icon="database"></b-icon>
            <span>{{ $t("info") }}</span>
        </p>
        <div v-if="uploads">
            <div class="columns is-centered is-vcentered">
                <div v-if="uploads.photo" class="column is-one-quarter-desktop">
                    <b-image :src="baseurl + '/users/getmedia.php?id=' + user.id + '&media=photo'"></b-image>
                </div>
                <div v-if="uploads.video" class="column is-one-quarter-desktop">
                    <video controls preload="metadata">
                        <source :src="baseurl + '/users/getmedia.php?id=' + user.id + '&media=video'">
                    </video>
                </div>
            </div>
            <div class="columns is-mobile is-centered is-vcentered">
                <div v-if="uploads.quote" class="column is-narrow">
                    <div class="notepaper">
                        <figure class="quote">
                            <blockquote v-html="uploads.quote" class="curly-quotes"></blockquote>
                            <figcaption class="quote-by">— {{ user.name }}</figcaption>
                        </figure>
                    </div>
                    <b-button :v-if="uploads.link" type="is-info" tag="a" :href="uploads.link" target="_blank">{{ $t("link") }}</b-button>
                </div>
            </div>
        </div>
        <Loading v-else></Loading>
        <hr>
        <!-- Upload More -->
        <p class="title has-text-centered">
            <b-icon icon="database"></b-icon>
            <span>{{ $t("upload.add") }}</span>
        </p>
        <div class="container has-text-centered">
            <div class="columns is-mobile is-multiline is-centered is-vcentered">
                <div class="column is-narrow">
                    <b-field class="file is-primary" :class="{'has-name': !!input.photo}">
                        <b-upload accept="image/gif,image/png,image/jpeg" v-model="input.photo" class="file-label">
                            <span class="file-cta">
                                <b-icon class="file-icon" icon="upload"></b-icon>
                                <span class="file-label">{{ $t("upload.photo") }}</span>
                            </span>
                            <span class="file-name" v-if="input.photo">
                                {{ input.photo.name }}
                            </span>
                        </b-upload>
                    </b-field>
                </div>
                <div class="column is-narrow">
                    <b-field class="file is-primary" :class="{'has-name': !!input.video}">
                        <b-upload accept="video/mp4,video/webm" v-model="input.video" class="file-label">
                            <span class="file-cta">
                                <b-icon class="file-icon" icon="upload"></b-icon>
                                <span class="file-label">{{ $t("upload.video") }}</span>
                            </span>
                            <span class="file-name" v-if="input.video">
                                {{ input.video.name }}
                            </span>
                        </b-upload>
                    </b-field>
                </div>
            </div>
            <b-field position="is-centered" :label="$t('upload.quote')">
                <b-input v-model="input.quote" placeholder="Hello, this is an example" maxlength="200" type="textarea"></b-input>
            </b-field>
            <b-field position="is-centered" :label="$t('link')">
                <b-input v-model="input.link" placeholder="https://github.com/pablouser1/IberbookEdu"></b-input>
            </b-field>
            <b-button :loading="isUploading" @click="uploadFiles">{{ $t("upload.send") }}</b-button>
        </div>
    </div>
</template>

<script>
import Loading from "@/components/Loading.vue"
import { BASE_URL } from "@/services/config.js"
import { getUserUploads, handleUpload } from "@/services/user.js"
export default {
    name: "Uploads",
    components: { Loading },
    data() {
        return {
            uploads: null,
            baseurl: BASE_URL,
            input: {
                photo: null,
                video: null,
                quote: null,
                link: null
            },
            isUploading: false
        }
    },
    created: async function () {
        this.uploads = await getUserUploads()
    },
    methods: {
        uploadFiles: async function() {
            this.isUploading = true
            const res = await handleUpload(this.input)
            if (res.code === "C") {
                this.uploads = await getUserUploads()
                this.$buefy.toast.open({
                    duration: 3000,
                    message: this.$t("upload.processed"),
                    position: 'is-bottom',
                    type: 'is-success'
                })
            }
            this.isUploading = false
        }
    },
    computed: {
        user: function() {
            return this.$store.state.userinfo
        }
    }
}
</script>

<style scoped>
/*
 * Copyright (c) 2012-2013 Thibaut Courouble
 * http://www.cssflow.com
 * Licensed under the MIT License
 *
 * Sass/SCSS source: https://goo.gl/8hncj
 * PSD by Liam McCabe: https://goo.gl/md3Dj
 */

.notepaper {
  position: relative;
  margin: 30px auto;
  padding: 29px 20px 20px 45px;
  width: 280px;
  line-height: 30px;
  color: #6a5f49;
  text-shadow: 0 1px 1px white;
  background-color: #f2f6c1;
  background-image: -webkit-radial-gradient(center, cover, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.1) 90%), -webkit-repeating-linear-gradient(top, transparent 0%, transparent 29px, rgba(239, 207, 173, 0.7) 29px, rgba(239, 207, 173, 0.7) 30px);
  background-image: -moz-radial-gradient(center, cover, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.1) 90%), -moz-repeating-linear-gradient(top, transparent 0%, transparent 29px, rgba(239, 207, 173, 0.7) 29px, rgba(239, 207, 173, 0.7) 30px);
  background-image: -o-radial-gradient(center, cover, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.1) 90%), -o-repeating-linear-gradient(top, transparent 0%, transparent 29px, rgba(239, 207, 173, 0.7) 29px, rgba(239, 207, 173, 0.7) 30px);
  border: 1px solid #c3baaa;
  border-color: rgba(195, 186, 170, 0.9);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.5), inset 0 0 5px #d8e071, 0 0 1px rgba(0, 0, 0, 0.1), 0 2px rgba(0, 0, 0, 0.02);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.5), inset 0 0 5px #d8e071, 0 0 1px rgba(0, 0, 0, 0.1), 0 2px rgba(0, 0, 0, 0.02);
}

.notepaper:before, .notepaper:after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
}

.notepaper:before {
  left: 28px;
  width: 2px;
  border: solid #efcfad;
  border-color: rgba(239, 207, 173, 0.9);
  border-width: 0 1px;
}

.notepaper:after {
  z-index: -1;
  left: 0;
  right: 0;
  background: rgba(242, 246, 193, 0.9);
  border: 1px solid rgba(170, 157, 134, 0.7);
  -webkit-transform: rotate(2deg);
  -moz-transform: rotate(2deg);
  -ms-transform: rotate(2deg);
  -o-transform: rotate(2deg);
  transform: rotate(2deg);
}

.quote {
  font-family: Georgia, serif;
  font-size: 14px;
}

.curly-quotes:before, .curly-quotes:after {
  display: inline-block;
  vertical-align: top;
  height: 30px;
  line-height: 48px;
  font-size: 50px;
  opacity: .2;
}

.curly-quotes:before {
  content: '\201C';
  margin-right: 4px;
  margin-left: -8px;
}

.curly-quotes:after {
  content: '\201D';
  margin-left: 4px;
  margin-right: -8px;
}

.quote-by {
  display: block;
  padding-right: 10px;
  text-align: right;
  font-size: 13px;
  font-style: italic;
  color: #84775c;
}

.lt-ie8 .notepaper {
  padding: 15px 25px;
}
</style>
