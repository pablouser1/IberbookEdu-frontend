<template>
    <div class="container has-text-centered">
        <p class="text">Cerrando sesión...</p>
    </div>
</template>

<script>
import { logout } from "@/services/common.js"
export default {
    name: "Logout",
    mounted: async function() {
        if (localStorage.loggedin) {
            await logout()
            const type = localStorage.loggedin
            const resetuserinfo = null
            this.$store.commit("setLoggedin", false)
            this.$store.commit('setUserinfo', {type, resetuserinfo})
            localStorage.removeItem("loggedin")
            localStorage.removeItem("userinfo")
        }
        this.$router.push("/")
    }
}
</script>
