<template>
    <section class="section">
        <div class="container">
            <p class="title">Ajustes del usuario</p>
            <p>Cambiar centro educativo / curso</p>
            <b-field label="Centro educativo">
                <b-select v-model="selectedSchool">
                    <option v-for="(school, index) in userinfo.schools" :key="index" :value="index">{{ school.name }} ({{ school.id }})</option>
                </b-select>
            </b-field>
            <b-field v-if="groups" label="Grupo">
                <b-select v-model="selectedGroup">
                    <option v-for="(group, index) in userinfo.schools[selectedSchool].groups" :key="index" :value="index">{{ group.name }}</option>
                </b-select>
            </b-field>
            <b-field>
                <b-button @click="sendChanges">Guardar cambios</b-button>
            </b-field>
        </div>
    </section>
</template>

<script>
import { setNewInfo } from "@/services/user.js"
export default {
    name: "User",
    methods: {
        sendChanges: async function() {
            const newSchool = {
                id: this.userinfo.schools[this.selectedSchool].id,
                name: this.userinfo.schools[this.selectedSchool].name
            }
            const newGroup = this.groups[this.selectedGroup]
            const res = await setNewInfo(newSchool.id, newGroup.name)
            if (res.code === "C") {
                const newUserinfo = res.data
                this.$store.commit('setUserinfo', newUserinfo)
                localStorage.userinfo = JSON.stringify(newUserinfo)
                this.$buefy.toast.open("Cambiado con éxito")
            }
            else {
                this.$buefy.toast.open(`Ha habido un error al procesar tu solicitud. ${res.error}`)
            }
        }
    },
    data() {
        return {
            selectedSchool: null,
            groups: null,
            selectedGroup: null
        }
    },
    watch: {
        "selectedSchool": function() {
            if (typeof this.selectedSchool === 'number') {
                this.groups = this.userinfo.schools[this.selectedSchool].groups
            }
        }
    },
    computed: {
        userinfo() {
            return this.$store.state.userinfo;
        }
    }
}
</script>