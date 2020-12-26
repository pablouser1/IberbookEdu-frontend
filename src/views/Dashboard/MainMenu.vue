<template>
    <div class="container">
        <p class="title">Información del usuario:</p>
        <p>Rango: {{ userinfo.rank }}</p>
        <p>Grupo: {{ userinfo.year }}</p>
        <div v-if="yearbook">
            <hr>
            <section class="hero is-success is-medium">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">Tu orla está lista</h1>
                        <router-link :to="'/yearbooks/' + yearbook.id">Ver</router-link>
                    </div>
                </div>
            </section>
            <hr>
        </div>
        <p class="title">Compañeros de clase:</p>
        <b-table :data="groupdata" :columns="columns"></b-table>
    </div>
</template>

<script>
import { getGroupData, getYearbook } from "@/services/user.js"
export default {
    name: "MainMenu",
    data() {
        return {
            groupdata: [],
            yearbook: null,
            columns: [
                {
                    field: 'name',
                    label: 'Nombre'
                },
                {
                    field: 'type',
                    label: 'Tipo'
                },
                {
                    field: 'subject',
                    label: 'Asignatura'
                },
                {
                    field: 'uploaded',
                    label: 'Última modificación'
                }
            ]
        }
    },
    created: async function() {
        this.groupdata = await getGroupData()
        this.yearbook = await getYearbook()
    },
    computed: {
        userinfo() {
            return this.$store.state.userinfo;
        }
    }
}
</script>
