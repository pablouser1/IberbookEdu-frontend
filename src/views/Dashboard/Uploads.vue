<i18n>
{
    "en": {
        "info": "Your info",
        "link": "Open link",
        "upload": {
            "add": "Upload/Replace data",
            "photo": "Photo",
            "video": "Video",
            "quote": "Quote",
            "link": "Link",
            "send": "Send",
            "reset": "Reset",
            "processed": "Your data has been processed successfully"
        }
    },
    "es": {
        "info": "Tus datos",
        "link": "Abrir enlace",
        "upload": {
            "add": "Subir/Reemplazar datos",
            "photo": "Foto",
            "video": "Vídeo",
            "quote": "Cita",
            "link": "Enlace",
            "send": "Enviar",
            "reset": "Limpiar",
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
        <div v-if="uploads && profileinfo.id">
            <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
            <div class="columns is-centered is-vcentered">
                <div v-if="uploads.photo" class="column is-one-quarter-desktop">
                    <b-image :src="baseurl + '/users/getMedia.php?id=' + profileinfo.id + '&media=photo'"></b-image>
                </div>
                <div v-if="uploads.video" class="column is-one-quarter-desktop">
                    <video controls preload="metadata">
                        <source :src="baseurl + '/users/getMedia.php?id=' + profileinfo.id + '&media=video'">
                    </video>
                </div>
            </div>
            <div class="columns is-mobile is-centered is-vcentered">
                <div v-if="uploads.quote" class="column is-narrow">
                    <div class="notepaper">
                        <figure class="quote">
                            <blockquote v-html="uploads.quote" class="curly-quotes"></blockquote>
                            <figcaption class="quote-by">— {{ userinfo.name }}</figcaption>
                        </figure>
                    </div>
                    <b-button :v-if="uploads.link" type="is-info" tag="a" :href="uploads.link" target="_blank" icon-left="link">{{ $t("link") }}</b-button>
                </div>
            </div>
        </div>
        <hr>
        <!-- Upload More -->
        <p class="title has-text-centered">
            <b-icon icon="database"></b-icon>
            <span>{{ $t("upload.add") }}</span>
        </p>
        <div class="container has-text-centered">
            <div class="columns is-mobile is-multiline is-centered is-vcentered">
                <div class="column is-narrow">
                    <b-field class="file is-primary" :class="{'has-name': !!input.media.photo}">
                        <b-upload accept="image/gif,image/png,image/jpeg" v-model="input.media.photo" class="file-label">
                            <span class="file-cta">
                                <b-icon class="file-icon" icon="upload"></b-icon>
                                <span class="file-label">{{ $t("upload.photo") }}</span>
                            </span>
                            <span class="file-name" v-if="input.media.photo">
                                {{ input.media.photo.name }}
                            </span>
                        </b-upload>
                    </b-field>
                </div>
                <div class="column is-narrow">
                    <b-field class="file is-primary" :class="{'has-name': !!input.media.video}">
                        <b-upload accept="video/mp4,video/webm" v-model="input.media.video" class="file-label">
                            <span class="file-cta">
                                <b-icon class="file-icon" icon="upload"></b-icon>
                                <span class="file-label">{{ $t("upload.video") }}</span>
                            </span>
                            <span class="file-name" v-if="input.media.video">
                                {{ input.media.video.name }}
                            </span>
                        </b-upload>
                    </b-field>
                </div>
            </div>
            <UploadProgress v-if="fileUploading.isActive" :progress="fileUploading"></UploadProgress>
            <b-field position="is-centered" :label="$t('upload.quote')">
                <b-input v-model="input.quote" placeholder="Hello, this is an example" maxlength="70" type="textarea"></b-input>
            </b-field>
            <b-field position="is-centered" :label="$t('link')">
                <b-input v-model="input.link" placeholder="https://github.com/pablouser1/IberbookEdu-frontend"></b-input>
            </b-field>
            <div class="buttons">
                <b-button type="is-success" icon-left="send" :loading="isUploading" @click="uploadData">{{ $t("upload.send") }}</b-button>
                <b-button type="is-danger" icon-left="close" @click="resetInput">{{ $t("upload.reset") }}</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import UploadProgress from '@/components/UploadProgress.vue'
import { BASE_URL } from '@/services/config.js'
import { getProfileUploads, handleMiscUpload } from '@/services/user.js'
import FileUpload from '@/services/FileUpload.js'
export default {
  name: 'Uploads',
  components: { UploadProgress },
  data () {
    return {
      uploads: null,
      baseurl: BASE_URL,
      input: {
        media: {
          photo: null,
          video: null
        },
        quote: null,
        link: null
      },
      isLoading: true,
      isUploading: false,
      fileUploading: {
        isActive: false,
        current: 0,
        total: 0,
        type: ''
      }
    }
  },
  mounted: async function () {
    this.uploads = await getProfileUploads()
    this.isLoading = false
  },
  methods: {
    async uploadData () {
      this.isUploading = true
      if (this.input.media.photo || this.input.media.video) {
        this.fileUploading.isActive = true
        if (this.input.media.photo) {
          await this.uploadMedia(this.input.media.photo, 'photo')
        }
        if (this.input.media.video) {
          await this.uploadMedia(this.input.media.video, 'video')
        }
        this.fileUploading.isActive = false
      }
      if (this.input.quote || this.input.link) {
        const miscRes = handleMiscUpload(this.input.link, this.input.quote)
        if (miscRes.code === 'C') {
          this.$buefy.toast.open({
            duration: 3000,
            message: this.$t('upload.processed'),
            position: 'is-bottom',
            type: 'is-success'
          })
        }
      }
      this.uploads = await getProfileUploads()
      this.resetInput()
      this.isUploading = false
    },
    async uploadMedia (media, type) {
      const fileClass = new FileUpload(media, type, '/users/uploadMedia.php')
      this.fileUploading.total = fileClass.NUM_CHUNKS
      this.fileUploading.type = type
      while (fileClass.start < fileClass.SIZE) {
        this.fileUploading.current = fileClass.num
        const res = await fileClass.send()
        if (!res || res.code === 'E') {
          break
        }
      }
    },
    resetInput () {
      this.input.media.photo = null
      this.input.media.video = null
      this.input.quote = null
      this.input.link = null
    }
  },
  computed: {
    userinfo: function () {
      return this.$store.state.userinfo
    },
    profileinfo: function () {
      return this.$store.state.profileinfo
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
