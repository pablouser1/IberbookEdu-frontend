<template>
    <div>
        <SearchYB @change-sort="changeSort"></SearchYB>
        <section class="section">
            <Exhibitor v-bind:yearbooks="yearbooks" @send-yearbook="setYearbook"></Exhibitor>
        </section>
        <section class="section">
            <div class="container has-text-centered">
                <b-button :disabled="limit" @click="newYearbooks">More</b-button>
            </div>
        </section>
    </div>
</template>

<script>
import { BASE_URL } from '@/services/config.js'
import {getYearbooks} from '@/services/common.js'
import SearchYB from "@/components/Yearbooks/SearchYB.vue"
import Exhibitor from "@/components/Yearbooks/Exhibitor.vue"
export default {
    name: "Yearbooks",
    components: {
        SearchYB,
        Exhibitor
    },
    data() {
        return {
            yearbooks: [],
            selectedYearbook: null,
            offset: 0, // Yearbooks already shown
            sort: "votes",
            limit: false // true when the user already loaded every yearbook available
        }
    },
    methods: {
        // Get yearbooks
        newYearbooks: async function() {
            if (!this.limit) {
                const fetchedYearbooks = await getYearbooks(this.offset, this.sort)
                if (fetchedYearbooks.code == "C") {
                    for (let i=0; i<fetchedYearbooks.data.length; i++) {
                        document.createElement('img').setAttribute('src', `${BASE_URL}/yearbooks/${fetchedYearbooks.data[i].banner}`);
                        this.yearbooks.push(fetchedYearbooks.data[i])
                    }
                    this.offset = this.offset + fetchedYearbooks.data.length
                }
                else if (fetchedYearbooks.code == "NO-MORE") {
                    this.$buefy.toast.open({
                        duration: 5000,
                        message: `Máximo de orlas alcanzadas`,
                        position: 'is-bottom',
                        type: 'is-danger'
                    })
                    this.limit = true
                }
                else {
                    this.$buefy.toast.open({
                        duration: 5000,
                        message: fetchedYearbooks.error,
                        position: 'is-bottom',
                        type: 'is-danger'
                    })
                }
            }
            else {
                this.$buefy.toast.open({
                    duration: 5000,
                    message: "No hay más orlas disponibles",
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            }
        },
        setYearbook: function(yearbook) {
            this.selectedYearbook = yearbook
        },
        changeSort: function(newsort) {
            this.sort = newsort
            // Reset values
            this.selectedYearbook = null
            this.offset = 0
            this.yearbooks = []
            this.limit = false
            // Get new Yearbooks
            this.newYearbooks()
        }
    },
    created() {
        this.newYearbooks()
    }
}
</script>
