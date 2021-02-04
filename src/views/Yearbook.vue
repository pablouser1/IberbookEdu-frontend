<i18n>
{
  "en": {
    "yearbook": "Yearbook",
    "see": "See yearbook",
    "votes": "No votes | One vote | {n} votes",
    "download": "Download",
    "vote": "Vote",
    "voteregistered": "Vote registered successfully",
    "link": "Copy link",
    "linkcopied": "Link copied successfully",
    "share": "You can also share this yearbook on social media"
  },
  "es": {
    "yearbook": "Orla",
    "see": "Ver orla",
    "votes": "No hay votos | Un voto | {n} votos",
    "download": "Descargar",
    "vote": "Votar",
    "voteregistered": "Voto registrado con éxito",
    "link": "Copiar enlace",
    "linkcopied": "Enlace copiado con éxito",
    "share": "También puedes compartir esta orla en redes sociales"
  }
}
</i18n>

<template>
    <section id="menu-hero" class="hero has-bg-img is-fullheight-with-navbar">
        <div class="hero-body">
            <div v-if="yearbook" class="box container has-text-centered">
                <p class="has-text-left">
                    <span v-on:click="$router.push('/yearbooks')" class="delete"></span>
                </p>
                <p class="title">
                    <b-icon icon="book"></b-icon>
                    <span>{{ $t("yearbook") }} {{ yearbook.schoolyear }}</span>
                </p>
                <p class="subtitle">{{ yearbook.acyear }}</p>
                <p>{{ $tc('votes', yearbook.votes) }}</p>
                <div class="buttons is-centered">
                    <b-button size="is-medium" tag="a" type="is-link" target="_blank" icon-left="book" :href="baseurl + yearbook.url">{{ $t("see") }}</b-button>
                </div>
                <!-- Opciones básicas -->
                <div class="buttons is-centered">
                    <b-button tag="a" type="is-link" icon-left="download" :href="baseurl + yearbook.url + '/yearbook.zip'">{{ $t("download") }}</b-button>
                    <button @click="vote(yearbook.id)" class="button is-primary">
                        <b-icon icon="ballot"></b-icon>
                        <span>{{ $t("vote") }}</span>
                    </button>
                </div>
                <!-- Compartir -->
                <div class="container">
                    <b-field position="is-centered">
                        <b-input id="inputlink" readonly :value="url"></b-input>
                        <b-button icon-left="link" type="is-primary" @click="clipboard">{{ $t("link") }}</b-button>
                    </b-field>
                    <br>
                    <label class="label">{{ $t("share") }}:</label>
                    <div class="buttons is-centered">
                        <b-button type="is-info" icon-left="facebook" size="medium" tag="a" :href="'https://www.facebook.com/sharer/sharer.php?u=' + shareurl">Facebook</b-button>
                        <b-button type="is-info" icon-left="twitter" size="medium" tag="a" :href="'https://twitter.com/intent/tweet?text=' + shareurl + '&hashtags=IberbookEdu'">Twitter</b-button>
                        <b-button type="is-success" icon-left="whatsapp" size="medium" tag="a" :href="'whatsapp://send?text=' + shareurl">Whatsapp</b-button>
                        <b-button type="is-info" icon-left="telegram" size="medium" tag="a" :href="'https://t.me/share/url?url=' + shareurl">Telegram</b-button>
                    </div>
                </div>
            </div>
            <Loading v-else></Loading>
        </div>
    </section>
</template>

<script>
import { hasPredifinedURL } from '@/services/api.js'
import Loading from "@/components/Loading.vue"
import { BASE_URL } from "@/services/config.js"
import { getYearbook } from "@/services/common.js"
import { setVote } from "@/services/user.js"

import "@/assets/banner.css"

export default {
    name: "Yearbook",
    props: ["id"],
    components: { Loading },
    data: function () {
        return {
            yearbook: null,
            baseurl: BASE_URL,
            url: "",
            shareurl: "",
            whatsappURL: ""
        }
    },
    methods: {
        clipboard: function () {
            document.getElementById("inputlink").select()
            document.execCommand('copy')
            this.$buefy.toast.open(this.$t("linkcopied"))
        },
        // Vote system
        vote: async function(id) {
            const voteanswer = await setVote(id)
            // Error voting
            if (voteanswer.code !== "C") {
                this.$buefy.toast.open({
                    duration: 5000,
                    message: voteanswer.error,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            }
            // Vote went OK
            else {
                this.$buefy.toast.open(this.$t("voteregistered"))
                this.yearbook.votes++;
            }
        }
    },
    async created() {
        this.yearbook = await getYearbook(this.id)
        if (hasPredifinedURL()) {
            this.url = window.location.href
        }
        else {
            this.url = this.baseurl + this.yearbook.url;
        }
        this.shareurl = encodeURIComponent(this.url);
        document.getElementById("menu-hero").style.backgroundImage = `url('${this.baseurl}/yearbooks/${this.yearbook.banner}')`
    }
}
</script>
