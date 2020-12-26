<template>
    <div class="container has-text-centered animate__animated animate__fadeIn">
        <div class="columns is-mobile is-centered is-multiline is-vcentered">
            <div class="column is-narrow" v-for="yearbook in yearbooks" v-bind:key="yearbook.id">
                <transition appear name="fade">
                    <div class="card">
                        <div class="card-image">
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
                                <p>{{ yearbook.schoolname }} - {{ yearbook.votes }} votos</p>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <router-link :to="'yearbooks/' + yearbook.id" class="card-footer-item">
                                <b-icon icon="information"></b-icon>
                                <span>Más información</span>
                            </router-link>
                        </footer>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
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

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>