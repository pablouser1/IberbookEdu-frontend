<template>
    <div>
        <b-sidebar type="is-light" :fullheight="true" :overlay="true" v-model="sideBar">
            <div class="p-1">
                <b-menu>
                    <b-menu-list label="Panel de control">
                        <b-menu-item icon="account" label="Menú principal" tag="router-link" to="/dashboard"></b-menu-item>
                        <b-menu-item icon="upload" label="Subidas" tag="router-link" to="/dashboard/uploads"></b-menu-item>
                        <b-menu-item icon="image-album" label="Galería" tag="router-link" to="/dashboard/gallery"></b-menu-item>
                    </b-menu-list>
                    <b-menu-list v-if="userinfo.rank === 'admin'" label="Administrador">
                        <b-menu-item icon="upload-multiple" label="Subidas de tu grupo" tag="router-link" to="/dashboard/admin/uploads"></b-menu-item>
                        <b-menu-item icon="image-album" label="Galería" tag="router-link" to="/dashboard/admin/gallery"></b-menu-item>
                        <b-menu-item icon="book" label="Orla" tag="router-link" to="/dashboard/admin/yearbook"></b-menu-item>
                    </b-menu-list>
                </b-menu>
            </div>
        </b-sidebar>
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title">Bienvenido, {{ userinfo.name }}</h1>
                </div>
            </div>
        </section>
        <section class="section">
            <b-button @click="sideBar = true">
                <b-icon icon="menu"></b-icon>
                <span>Menú</span>
            </b-button>
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            sideBar: false
        }
    },
    computed: {
        userinfo() {
            return this.$store.state.userinfo;
        }
    }
};
</script>
