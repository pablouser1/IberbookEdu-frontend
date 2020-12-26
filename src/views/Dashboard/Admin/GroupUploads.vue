<template>
    <section>
        <p class="title has-text-centered">Usuarios del grupo {{ userinfo.year }}</p>
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
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

            <b-table-column field="id" label="ID" numeric sortable v-slot="props">
                {{ props.row.id }}
            </b-table-column>

            <b-table-column field="name" label="Nombre completo" searchable sortable v-slot="props">
                <template>
                    {{ props.row.name }}
                </template>
            </b-table-column>

            <b-table-column field="type" label="Tipo" sortable v-slot="props">
                {{ props.row.type }}
            </b-table-column>

            <b-table-column field="link" label="Enlace" v-slot="props">
                <template>
                    <b-button :disabled="!props.row.link" type="is-info" size="is-small" tag="a" :href="props.row.link">Abrir enlace</b-button>
                </template>
            </b-table-column>

            <b-table-column field="subject" label="Asignatura" sortable v-slot="props">
                {{ props.row.subject }}
            </b-table-column>

            <template slot="detail" slot-scope="props">
                <div class="columns is-centered is-vcentered">
                    <div v-if="props.row.photo" class="column is-one-quarter-desktop">
                        <b-image :src="baseurl + '/users/getmedia.php?id=' + props.row.id + '&media=photo'"></b-image>
                    </div>
                    <div v-if="props.row.video" class="column is-one-quarter-desktop">
                        <video controls>
                            <source :src="baseurl + '/users/getmedia.php?id=' + props.row.id + '&media=video'">
                        </video>
                    </div>
                </div>
            </template>
        </b-table>
        <hr>
        <div class="container">
            <p class="title">Gestionar usuario</p>
            <p class="subtitle" v-if="!selected">Selecciona a un usuario primero</p>
            <div v-if="selected">
                <span class="tag is-danger">{{ selected.name }} (ID: {{ selected.id }})</span>
                <b-field label="Elementos a eliminar">
                    <b-select multiple native-size="4" v-model="deletedElements">
                        <option value="photo">Foto</option>
                        <option value="video">Vídeo</option>
                        <option value="link">Enlace</option>
                        <option value="quote">Cita</option>
                    </b-select>
                </b-field>
                <b-field label="Motivo">
                    <b-input v-model="reason" type="textarea" placeholder="Escribe un motivo"></b-input>
                </b-field>
                <b-button>Enviar</b-button>
            </div>
        </div>
    </section>
</template>

<script>
import { BASE_URL } from "@/services/config.js"
import { getGroupData } from "@/services/user.js"
export default {
    name: "GroupUploads",
    data() {
        return {
            baseurl: BASE_URL,
            groupdata: [],
            selected: null,
            deletedElements: null,
            reason: ""
        }
    },
    created: async function() {
        this.groupdata = await getGroupData()
    },
    computed: {
        userinfo: function() {
            return this.$store.state.userinfo;
        }
    }
}
</script>