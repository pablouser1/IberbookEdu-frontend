<i18n>
{
    "en": {
        "username": "Username",
        "password": "Password",
        "im": "I'm...",
        "types": {
            "select": "Choose a rank",
            "student": "Student",
            "guardian": "Guardian",
            "teacher": "Teacher"
        },
        "login": "Login"
    },
    "es": {
        "username": "Nombre de usuario",
        "password": "Contraseña",
        "im": "Soy...",
        "types": {
            "select": "Elige un rango",
            "student": "Alumno",
            "guardian": "Tutor legal",
            "teacher": "Profesor"
        },
        "login": "Iniciar sesión"
    }
}
</i18n>

<template>
    <section class="section">
        <div class="container">
            <!-- FORM -->

            <!-- Username -->
            <b-field :label="$t('username')">
                <b-input icon="account" size="medium" v-model="input.username"></b-input>
            </b-field>

            <!-- Password -->
            <b-field :label="$t('password')">
                <b-input icon="lock" type="password" password-reveal size="medium" v-model="input.password"></b-input>
            </b-field>
                        
            <b-field :label="$t('im')">
                <b-select v-model="input.type" :placeholder="$t('types.select')">
                    <option value="students">{{ $t("types.student") }}</option>
                    <option value="guardians">{{ $t("types.guardian") }}</option>
                    <option value="teachers">{{ $t("types.teacher") }}</option>
                </b-select>
            </b-field>
            <b-button icon-left="login-variant" :loading="loggingIn" @click="startLogin" type="is-primary" expanded>Iniciar sesión</b-button>
        </div>
    </section>
</template>

<script>
import { login } from "../services/common.js"
export default {
    name: "Login",
    data() {
        return {
            loggingIn: false,
            input: {
                username: "",
                password: "",
                type: ""
            }
        }
    },
    methods: {
        startLogin: async function() {
            this.loggingIn = true
            const logindata = await login(this.input)
            // Log in failed
            if (!logindata || logindata.code !== "C") {
                this.$buefy.dialog.alert({
                    title: 'Error',
                    message: logindata.error,
                    type: 'is-danger',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
                this.loggingIn = false
            }
            // Log in OK
            else {
                const userinfo = logindata.data.userinfo
                const type = logindata.data.userinfo.type
                this.$store.commit('setLoggedin', type)
                this.$store.commit('setUserinfo', userinfo)
                localStorage.loggedin = type
                localStorage.userinfo = JSON.stringify(userinfo)
                this.loggingIn = false
                this.$router.push("/profile")
            }
        }
    }
}
</script>
