<i18n>
{
    "en": {
        "profile": "Change profile",
        "password": {
            "title": "Change password",
            "old": "Old password",
            "new": "New password",
            "help": "Password should be at least 8 characters in length and should include at least one upper case letter, one number, and one special character"
        },
        "options": "Options"
    },
    "es": {
        "profile": "Cambiar perfil",
        "password": {
            "title": "Cambiar contraseña",
            "old": "Contraseña antigua",
            "new": "Nueva contraseña",
            "help": "La longitud mínima es de 8 caracteres y debe incluir al menos una mayúscula, un número y un caracter especial"
        },
        "options": "Opciones"
    }
}
</i18n>

<template>
    <section class="section">
        <div class="container">
            <p class="title">{{ $t("password.title") }}</p>
            <b-field :label="$t('password.old')">
                <b-input v-model="oldPassword" required type="password"></b-input>
            </b-field>
            <b-field :label="$t('password.new')" :message="$t('password.new')">
                <b-input v-model="newPassword" required type="password"></b-input>
            </b-field>
            <b-field>
                <b-button @click="changePassword" type="is-success">Change</b-button>
            </b-field>
        </div>
        <hr>
        <div class="container">
            <p class="title">{{ $t("options") }}</p>
            <router-link class="button is-info" to="/profile" tag="button">
                <b-icon icon="swap-horizontal"></b-icon>
                <span>{{ $t("profile") }}</span>
            </router-link>
        </div>
    </section>
</template>

<script>
import { changePassword } from "@/services/user.js"
export default {
    name: "User",
    data() {
        return {
            oldPassword : "",
            newPassword: ""
        }
    },
    methods: {
        changePassword: async function() {
            const res = await changePassword(this.oldPassword, this.newPassword)
            if (res.code === "C") {
                this.$buefy.toast.open({
                    message: 'Password changed successfully',
                    type: 'is-success'
                })
            }
            else {
                this.$buefy.toast.open({
                    message: 'Error, please try again later',
                    type: 'is-danger'
                })
            }
        }
    }
}
</script>
