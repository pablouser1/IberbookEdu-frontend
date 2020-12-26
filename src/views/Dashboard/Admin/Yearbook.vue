<template>
    <div class="container">
        <div v-if="yearbook">
            <h1 class='title'>Tu orla</h1>
            <p class='subtitle'>Generada el {{ yearbook.generated }}
            <div class='buttons'>
                <router-link class="button is-success" to="/yearbooks" tag="button">Ver orla</router-link>
                <b-button @click="deleteYearbook" type="is-danger">Eliminar orla</b-button>
            </div>
        </div>
        <div v-else>
            <p class="title">Administrar yearbook</p>
            <b-field label="Plantilla">
                <b-select v-if="themes" v-model="chosenTheme">
                    <option v-for="(theme, index) in themes" :key="index">{{theme}}</option>
                </b-select>
            </b-field>
            <b-field class="file is-primary" :class="{'has-name': !!banner}">
                <b-upload accept="image/gif,image/png,image/jpeg" v-model="banner" class="file-label">
                    <span class="file-cta">
                        <b-icon class="file-icon" icon="upload"></b-icon>
                        <span class="file-label">Subir banner</span>
                    </span>
                    <span class="file-name" v-if="banner">
                        {{ banner.name }}
                    </span>
                </b-upload>
            </b-field>
            <b-button @click="uploadYearbook" v-bind:class="{ 'is-loading': generating}">Generar orla</b-button>
        </div>
    </div>
</template>

<script>
import { getYearbook } from "@/services/user.js"
import { getThemes, uploadYearbook, deleteYearbook } from "@/services/admin.js"
export default {
    name: "Yearbook",
    data() {
        return {
            yearbook: null,
            generating: false,
            banner: null,
            themes: [],
            chosenTheme: "default"
        }
    },
    created: async function() {
        this.yearbook = await getYearbook()
        this.themes = await getThemes()
    },
    methods: {
        uploadYearbook: async function() {
            this.generating = true
            const newYearbook = await uploadYearbook(this.chosenTheme, this.banner)
            if (newYearbook.code === "C") {
                this.$buefy.toast.open("Orla generada con éxito")
                this.yearbook = await getYearbook()
            }
            else {
                this.$buefy.toast.open({
                    duration: 3000,
                    message: `Ha habido un error al subir la orla, ${newYearbook.error}`,
                    position: 'is-bottom',
                    type: 'is-success'
                })
            }
            this.generating = false
        },
        deleteYearbook: async function() {
            const delYearbook = await deleteYearbook()
            if (delYearbook.code === "C") {
                this.$buefy.toast.open("Orla eliminada con éxito")
                this.yearbook = await getYearbook()
            }
            else {
                this.$buefy.toast.open({
                    duration: 3000,
                    message: `Ha habido un error al eliminar la orla, ${delYearbook.error}`,
                    position: 'is-bottom',
                    type: 'is-success'
                })
            }
        }
    }
}
</script>