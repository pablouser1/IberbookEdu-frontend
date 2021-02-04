<i18n>
{
    "en": {
        "users": "Users from {group}",
        "table": {
            "next": "Next page",
            "previous": "Previous page",
            "page": "Page",
            "current": "Current page",
            "columns": {
                "name": "Full name",
                "type": "Type",
                "link": "Link",
                "subject": "Subject"
            }
        },
        "manage": {
            "title": "Manage users",
            "select": "Select the user first",
            "tobedeleted": "Choose what elements need to be deleted",
            "photo": "Photo",
            "video": "Video",
            "link": "Link",
            "quote": "Quote",
            "send": "Delete"
        }
    },
    "es": {
        "users": "Usuarios del grupo {group}",
        "table": {
            "next": "Sig. página",
            "previous": "Página anterior",
            "page": "Página",
            "current": "Página actual",
            "columns": {
                "name": "Nombre completo",
                "type": "Tipo",
                "link": "Enlace",
                "subject": "Asignatura"
            }
        },
        "manage": {
            "title": "Gestionar usuarios",
            "select": "Selecciona un usuario primero",
            "tobedeleted": "Elige los elementos a ser eliminados",
            "photo": "Foto",
            "video": "Vídeo",
            "link": "Enlace",
            "quote": "Cita",
            "send": "Eliminar"
        }
    }
}
</i18n>

<template>
    <section>
        <i18n class="title has-text-centered" path="users" tag="p">
            <template v-slot:group>
                <span>{{ profileinfo.year }}</span>
            </template>
        </i18n>
        <b-table
            :data="groupdata"
            ref="table"
            paginated
            :selected.sync="selected"
            focusable
            per-page="5"
            detailed
            detail-key="id"
            :show-detail-icon="true"
            :aria-next-label="$t('table.next')"
            :aria-previous-label="$t('table.previous')"
            :aria-page-label="$t('table.page')"
            :aria-current-label="$t('table.current')">

            <b-table-column field="id" label="ID" numeric sortable v-slot="props">
                {{ props.row.id }}
            </b-table-column>

            <b-table-column field="name" :label="$t('table.columns.name')" searchable sortable v-slot="props">
                <template>
                    {{ props.row.name }}
                </template>
            </b-table-column>

            <b-table-column field="type" :label="$t('table.columns.type')" sortable v-slot="props">
                {{ props.row.type }}
            </b-table-column>

            <b-table-column field="link" :label="$t('table.columns.link')" v-slot="props">
                <template>
                    <b-button :disabled="!props.row.link" type="is-info" size="is-small" tag="a" :href="props.row.link">Click</b-button>
                </template>
            </b-table-column>

            <b-table-column field="subject" :label="$t('table.columns.subject')" sortable v-slot="props">
                {{ props.row.subject }}
            </b-table-column>

            <template slot="detail" slot-scope="props">
                <div class="columns is-centered is-vcentered">
                    <div v-if="props.row.photo" class="column is-one-quarter-desktop">
                        <b-image :src="baseurl + '/users/getMedia.php?id=' + props.row.id + '&media=photo'"></b-image>
                    </div>
                    <div v-if="props.row.video" class="column is-one-quarter-desktop">
                        <video controls>
                            <source :src="baseurl + '/users/getMedia.php?id=' + props.row.id + '&media=video'">
                        </video>
                    </div>
                </div>
            </template>
        </b-table>
        <hr>
        <div class="container">
            <p class="title">{{ $t("manage.title") }}</p>
            <p class="subtitle" v-if="!selected">{{ $t("manage.select") }}</p>
            <div v-if="selected">
                <span class="tag is-danger">{{ selected.name }} (ID: {{ selected.id }})</span>
                <b-field :label="$t('manage.tobedeleted')">
                    <b-select multiple native-size="4" v-model="deletedElements">
                        <option value="photo">{{ $t("manage.photo") }}</option>
                        <option value="video">{{ $t("manage.video") }}</option>
                        <option value="link">{{ $t("manage.link") }}</option>
                        <option value="quote">{{ $t("manage.quote") }}</option>
                    </b-select>
                </b-field>
                <b-button @click="deleteItems" type="is-danger" icon-left="delete">{{ $t("manage.send") }}</b-button>
            </div>
        </div>
    </section>
</template>

<script>
import { BASE_URL } from "@/services/config.js"
import { getGroupData } from "@/services/user.js"
import { deleteUserItems } from "@/services/admin.js"
export default {
    name: "GroupUploads",
    methods: {
        deleteItems: async function() {
            const res = await deleteUserItems(this.selected.id, this.deletedElements);
            if (res.code === "C") {
                this.$buefy.toast.open({
                    duration: 3000,
                    message: "Deleted successfully",
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            }
            else {
                this.$buefy.toast.open({
                    duration: 3000,
                    message: res.error,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            }
            this.groupdata = await getGroupData()
        }
    },
    data() {
        return {
            baseurl: BASE_URL,
            groupdata: [],
            selected: null,
            deletedElements: []
        }
    },
    mounted: async function() {
        this.groupdata = await getGroupData()
    },
    computed: {
        profileinfo: function() {
            return this.$store.state.profileinfo;
        }
    }
}
</script>
