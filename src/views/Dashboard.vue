<i18n>
{
    "en": {
        "controlpanel": "Control panel",
        "admin": "Administrator",
        "tabs": {
            "user": {
                "mainmenu": "Main menu",
                "uploads": "Uploads",
                "gallery": "Gallery"
            },
            "admin": {
                "groupuploads": "Group uploads",
                "admingallery": "Admin gallery",
                "yearbook": "Yearbook"
            }
        },
        "welcome": "Welcome",
        "menu": "Menu"
    },
    "es": {
        "controlpanel": "Panel de control",
        "admin": "Administrador",
        "tabs": {
            "user": {
                "mainmenu": "Menú principal",
                "uploads": "Subidas",
                "gallery": "Galería"
            },
            "admin": {
                "groupuploads": "Subidas del grupo",
                "admingallery": "Galería del administrador",
                "yearbook": "Orla"
            }
        },
        "welcome": "Bienvenido",
        "menu": "Menú"
    }
}
</i18n>

<template>
    <div>
        <b-sidebar type="is-light" :fullheight="true" :overlay="true" v-model="sideBar">
            <div class="p-1">
                <b-menu>
                    <b-menu-list :label="$t('controlpanel')">
                        <b-menu-item icon="account" :label="$t('tabs.user.mainmenu')" @click="switchTab('/dashboard')"></b-menu-item>
                        <b-menu-item icon="upload" :label="$t('tabs.user.uploads')" @click="switchTab('/dashboard/uploads')"></b-menu-item>
                        <b-menu-item icon="image-album" :label="$t('tabs.user.gallery')" @click="switchTab('/dashboard/gallery')"></b-menu-item>
                    </b-menu-list>
                    <b-menu-list v-if="userinfo.rank === 'admin'" :label="$t('admin')">
                        <b-menu-item icon="upload-multiple" :label="$t('tabs.admin.groupuploads')" @click="switchTab('/dashboard/admin/uploads')"></b-menu-item>
                        <b-menu-item icon="image-album" :label="$t('tabs.admin.admingallery')" @click="switchTab('/dashboard/admin/gallery')"></b-menu-item>
                        <b-menu-item icon="book" :label="$t('tabs.admin.yearbook')" @click="switchTab('/dashboard/admin/yearbook')"></b-menu-item>
                    </b-menu-list>
                </b-menu>
            </div>
        </b-sidebar>
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title">{{ $t("welcome") }}: {{ userinfo.name }}</h1>
                </div>
            </div>
        </section>
        <section class="section">
            <b-button @click="sideBar = true">
                <b-icon icon="menu"></b-icon>
                <span>{{ $t("menu") }}</span>
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
    methods: {
        switchTab: function(tab) {
            this.$router.push(tab)
            this.sideBar = false
        }
    },
    computed: {
        userinfo() {
            return this.$store.state.userinfo;
        }
    }
};
</script>
