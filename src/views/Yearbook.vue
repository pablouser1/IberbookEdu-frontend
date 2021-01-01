<template>
    <section id="menu-hero" class="hero has-bg-img is-fullheight-with-navbar">
        <div class="hero-body">
            <div v-if="yearbook" class="box container has-text-centered">
                <p class="has-text-left">
                    <span v-on:click="$router.push('/yearbooks')" class="delete"></span>
                </p>
                <p class="title">
                    <b-icon icon="book"></b-icon>
                    <span>Orla {{ yearbook.schoolyear }}</span>
                </p>
                <p class="subtitle">{{ yearbook.acyear }}</p>
                <p>{{ yearbook.votes }} voto(s)</p>
                <div class="buttons is-centered">
                    <b-button size="is-medium" tag="a" type="is-link" target="_blank" icon-left="book" :href="baseurl + yearbook.url">Ver orla</b-button>
                </div>
                <!-- Opciones básicas -->
                <div class="buttons is-centered">
                    <b-button tag="a" type="is-link" target="_blank" icon-left="zip-box" :href="baseurl + yearbook.url + '/yearbook.zip'">Descargar zip</b-button>
                    <button @click="vote(yearbook.id)" class="button is-primary">
                        <b-icon icon="ballot"></b-icon>
                        <span>Votar</span>
                    </button>
                </div>
                <!-- Compartir -->
                <div class="container">
                    <b-field position="is-centered">
                        <b-input id="inputlink" readonly :value="url"></b-input>
                        <b-button icon-left="link" type="is-primary" @click="clipboard">Copiar enlace</b-button>
                    </b-field>
                    <br>
                    <label class="label">También puedes compartir esta orla por redes sociales:</label>
                    <div class="buttons is-centered">
                        <b-button type="is-info" icon-left="facebook" size="medium" tag="a" :href="'https://www.facebook.com/sharer/sharer.php?u=' + shareurl">Facebook</b-button>
                        <b-button type="is-info" icon-left="twitter" size="medium" tag="a" :href="'https://twitter.com/intent/tweet?text=Echa%20un%20vistazo%20a%20mi%20anuario%20en&url=' + shareurl + '&hashtags=IberbookEdu'">Twitter</b-button>
                        <b-button type="is-success" icon-left="whatsapp" size="medium" tag="a" :href="whatsappURL">Whatsapp</b-button>
                        <b-button type="is-info" icon-left="telegram" size="medium" tag="a" :href="'https://t.me/share/url?url=' + shareurl + '&text=Echa%20un%20vistazo%20a%20mi%20anuario%20creado%20con%20%23IberbookEdu'">Telegram</b-button>
                    </div>
                </div>
            </div>
            <Loading v-else></Loading>
        </div>
    </section>
</template>

<script>
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
            this.$buefy.toast.open("Enlace copiado con éxito")
        },
        // Vote system
        vote: async function(id) {
            const voteanswer = await setVote(id)
            // Error voting
            if (voteanswer.code !== "C") {
                this.$buefy.toast.open({
                    duration: 5000,
                    message: `Ha habido un error al registrar el voto: ${voteanswer.error}`,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            }
            // Vote went OK
            else {
                this.$buefy.toast.open("Voto registrado con éxito")
                this.yearbook.votes++;
            }
        }
    },
    async created() {
        this.yearbook = await getYearbook(this.id)
        this.url = this.baseurl + this.yearbook.url;
        this.shareurl = encodeURIComponent(this.url);
        let starturl;
        if(/Android|iPhone|iPod|BlackBerry|Opera Mini/i.test(navigator.userAgent)){
            // Phone user
            starturl = "whatsapp://send?text="
        }
        else {
            // Desktop user, use Whatsapp Web
            starturl = "https://web.whatsapp.com/send?text="
        }
        this.whatsappURL = `${starturl}Echa%20un%20vistazo%20a%20mi%20anuario%20creado%20con%20IberbookEdu%20en%3A%20${this.shareurl}`
        document.getElementById("menu-hero").style.backgroundImage = `url('${this.baseurl}/yearbooks/${this.yearbook.banner}')`
    }
}
</script>
