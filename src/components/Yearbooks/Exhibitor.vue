<i18n>
{
    "en": {
        "info": "More info",
        "votes": "Votes"
    },
    "es": {
        "info": "Más información",
        "votes": "Votos"
    }
}
</i18n>

<template>
    <div class="container has-text-centered">
        <div class="columns is-mobile is-centered is-multiline is-vcentered">
            <div class="column is-narrow" v-for="yearbook in yearbooks" :key="yearbook.id">
                <transition appear name="fade">
                    <div class="card">
                        <div v-if="yearbook.banner" class="card-image">
                            <figure class="image is-16by9">
                                <img :src="baseurl + '/yearbooks/' + yearbook.banner" alt="Banner">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">{{ yearbook.schoolyear }}</p>
                                    <p class="subtitle is-6">{{ yearbook.acyear }}</p>
                                </div>
                            </div>
                            <div class="content">
                                <p>{{ yearbook.schoolname }} - {{ yearbook.votes }} {{ $t("votes") }}</p>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <router-link :to="'yearbooks/' + yearbook.id" class="card-footer-item">
                                <b-icon icon="information"></b-icon>
                                <span>{{ $t("info") }}</span>
                            </router-link>
                        </footer>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import '@/assets/animations.css'
import { BASE_URL } from "@/services/config.js"
export default {
    name: "Exhibitor",
    props: {
        yearbooks: {
            type: Array,
            requiered: true
        }
    },
    data() {
        return {
            baseurl: BASE_URL
        }
    }
}
</script>
