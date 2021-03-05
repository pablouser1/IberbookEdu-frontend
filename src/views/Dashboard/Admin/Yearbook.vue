<i18n>
{
    "en": {
        "create": {
            "manage": "Manage yearbook",
            "template": "Template",
            "generate": "Generate yearbook",
            "banner": "Upload banner"
        },
        "generated": {
            "yearbook": "Your yearbook",
            "date": "Generated on {date}",
            "see": "See yearbook",
            "delete": "Delete yearbook",
            "deleted": "Yearbook deleted successfully",
            "success": "Yearbook generated successfully",
            "error": "There was an error when generating the yearbook"
        },
        "delete": {
            "action": "Delete yearbook",
            "deleted": "Deleted successfully",
            "error": "There was an error when deleting the yearbook"
        }
    },
    "es": {
        "create": {
            "manage": "Administrar orla",
            "template": "Plantilla",
            "generate": "Generar orla",
            "banner": "Subir cabecera"
        },
        "generated": {
            "yearbook": "Tu orla",
            "date": "Generada el {date}",
            "see": "Ver orla",
            "delete": "Eliminar orla",
            "deleted": "Orla eliminada con éxito",
            "success": "Orla generada con éxito",
            "error": "Ha habido un error al subir la orla"
        },
        "delete": {
            "action": "Eliminar orla",
            "deleted": "Eliminada con éxito",
            "error": "Ha habido un error al eliminar la orla"
        }
    }
}
</i18n>

<template>
    <div class="container">
        <div v-if="yearbook">
            <h1 class='title'>{{ $t("generated.yearbook") }}</h1>
            <i18n class="subtitle" path="generated.date" tag="p">
                <template v-slot:date>
                    <span>{{ yearbook.generated }}</span>
                </template>
            </i18n>
            <div class='buttons'>
                <router-link class="button is-success" :to="'/yearbooks/' + yearbook.id" custom v-slot="{ navigate }">
                    <span @click="navigate" @keypress.enter="navigate" role="link">{{ $t("generated.see") }}</span>
                </router-link>
                <b-button @click="deleteYearbook" type="is-danger">{{ $t("delete.action") }}</b-button>
            </div>
        </div>
        <div v-else>
            <p class="title">{{ $t("create.manage") }}</p>
            <b-field :label="$t('create.template')">
                <b-select v-if="themes" v-model="chosenTheme">
                    <option v-for="(theme, index) in themes" :key="theme.id" :value="index">{{theme.name}}</option>
                </b-select>
            </b-field>
            <div v-if="theme">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">{{theme.name}}</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <p>{{theme.description}}</p>
                            <p v-if="theme.zip">Can be zippable</p>
                            <p v-if="theme.banner">Can add banner</p>
                        </div>
                    </div>
                </div>
                <hr>
                <b-field v-if="theme.banner" class="file is-primary" :class="{'has-name': !!banner}">
                    <b-upload accept="image/gif,image/png,image/jpeg" v-model="banner" class="file-label">
                        <span class="file-cta">
                            <b-icon class="file-icon" icon="upload"></b-icon>
                            <span class="file-label">{{ $t("create.banner") }}</span>
                        </span>
                        <span class="file-name" v-if="banner">{{ banner.name }}</span>
                    </b-upload>
                </b-field>
                <b-button type="is-success" @click="uploadYearbook" v-bind:class="{ 'is-loading': generating}">{{ $t("create.generate") }}</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import { getYearbook } from '@/services/user.js'
import { getThemes } from '@/services/common.js'
import { uploadYearbook, deleteYearbook } from '@/services/admin.js'
export default {
  name: 'Yearbook',
  data () {
    return {
      yearbook: null,
      generating: false,
      banner: null,
      themes: [],
      chosenTheme: 0 // Index of chosen theme, 0 default (first)
    }
  },
  methods: {
    uploadYearbook: async function () {
      this.generating = true
      const newYearbook = await uploadYearbook(this.theme.id, this.banner)
      if (newYearbook.code === 'C') {
        this.$buefy.toast.open(this.$t('generated.success'))
        this.yearbook = await getYearbook()
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: `${this.$t('generated.error')}, ${newYearbook.error}`,
          position: 'is-bottom',
          type: 'is-success'
        })
      }
      this.generating = false
    },
    deleteYearbook: async function () {
      const delYearbook = await deleteYearbook()
      if (delYearbook.code === 'C') {
        this.$buefy.toast.open(this.$t('generated.deleted'))
        this.yearbook = await getYearbook()
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: `${this.$t('delete.error')}, ${delYearbook.error}`,
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    }
  },
  created: async function () {
    this.yearbook = await getYearbook()
    this.themes = await getThemes()
  },
  computed: {
    theme: function () {
      return this.themes[this.chosenTheme]
    }
  }
}
</script>
