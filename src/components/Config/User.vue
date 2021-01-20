<i18n>
{
    "en": {
        "user": "User settings",
        "swap": "Change school / group",
        "school": "School",
        "group": "Group",
        "save": "Save changes"
    },
    "es": {
        "user": "Ajustes del usuario",
        "swap": "Cambiar centro educativo / curso",
        "school": "Centro educativo",
        "group": "Grupo",
        "save": "Guardar cambios"
    }
}
</i18n>

<template>
    <section class="section">
        <div class="container">
            <p class="title">{{ $t("user") }}</p>
            <p>{{ $t("swap") }}</p>
            <b-field label="Child" v-if="guardianinfo">
                <b-select v-model="selectedChild">
                    <option v-for="(child, index) in guardianinfo.children" :key="index" :value="index">{{ child.name }}</option>
                </b-select>    
            </b-field>
            <b-field :label="$t('school')">
                <b-select v-model="selectedSchool">
                    <option v-for="(school, index) in userinfo.schools" :key="index" :value="index">{{ school.name }} ({{ school.id }})</option>
                </b-select>
            </b-field>
            <b-field v-if="groups" :label="$t('group')">
                <b-select v-model="selectedGroup">
                    <option v-for="(group, index) in userinfo.schools[selectedSchool].groups" :key="index" :value="index">{{ group.name }}</option>
                </b-select>
            </b-field>
            <b-field>
                <b-button @click="sendChanges">{{ $t("save") }}</b-button>
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
                this.setNewuserinfo(res.data)
                this.$buefy.toast.open("Cambiado con éxito")
            }
            else {
                this.$buefy.toast.open(`Ha habido un error al procesar tu solicitud. ${res.error}`)
            }
        },
        setUserinfo: function(newInfo) {
            this.$store.commit('setUserinfo', newInfo)
            localStorage.userinfo = JSON.stringify(newInfo)
        }
    },
    data() {
        return {
            selectedChild: null, // Only used with guardians
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
        },
        "selectedChild": function() {
            this.setUserinfo(this.guardianinfo.children[this.selectedChild])
        }
    },
    computed: {
        userinfo() {
            return this.$store.state.userinfo;
        },
        guardianinfo() {
            return this.$store.state.guardianinfo;
        }
    }
}
</script>
