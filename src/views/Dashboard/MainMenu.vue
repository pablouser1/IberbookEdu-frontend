<i18n>
{
    "en": {
        "userinfo": "User info",
        "rank": "Rank",
        "group": "Group",
        "yearbook": {
            "ready": "Your yearbook is ready",
            "see": "View"
        },
        "classmates": "Classmates",
        "columns": {
            "name": "Name",
            "type": "Type",
            "subject": "Subject",
            "lastseen": "Last seen"
        }
    },
    "es": {
        "userinfo": "Información del usuario",
        "rank": "Rango",
        "group": "Grupo",
        "yearbook": {
            "ready": "Tu orla está lista",
            "see": "Ver"
        },
        "classmates": "Compañeros de clase",
        "columns": {
            "name": "Nombre",
            "type": "Tipo",
            "subject": "Asignatura",
            "lastseen": "Última modificación"
        }
    }
}
</i18n>

<template>
    <div class="container">
        <p class="title">{{ $t("userinfo") }}:</p>
        <p>{{ $t("rank") }}: {{ userinfo.rank }}</p>
        <p>{{ $t("group") }}: {{ profileinfo.year }}</p>
        <div v-if="yearbook">
            <hr>
            <section class="hero is-success is-medium">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">{{ $t("yearbook.ready") }}</h1>
                        <router-link :to="'/yearbooks/' + yearbook.id">{{ $t("yearbook.see") }}</router-link>
                    </div>
                </div>
            </section>
            <hr>
        </div>
        <p class="title">{{ $t("classmates") }}:</p>
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
                    label: this.$t("columns.name")
                },
                {
                    field: 'type',
                    label: this.$t("columns.type")
                },
                {
                    field: 'subject',
                    label: this.$t("columns.subject")
                },
                {
                    field: 'uploaded',
                    label: this.$t("columns.lastseen")
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
        },
        profileinfo() {
            return this.$store.state.profileinfo;
        }
    }
}
</script>
