<template>
    <section class="section">
        <div class="container">
            <!-- FORM -->

            <!-- Username -->
            <b-field label="Nombre de usuario">
                <b-input icon="account" size="medium" v-model="input.username"></b-input>
            </b-field>

            <!-- Password -->
            <b-field label="Contraseña">
                <b-input icon="lock" type="password" size="medium" v-model="input.password"></b-input>
            </b-field>
                        
            <b-field label="Soy...">
                <b-select v-model="input.type" placeholder="Selecciona un rango">
                    <option value="students">Alumno</option>
                    <option value="guardians">Tutor legal</option>
                    <option value="teachers">Profesor</option>
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
                    message: `Ha habido un error al iniciar sesión.<br>${logindata.error}`,
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
                this.$router.push("/")
            }
        }
    }
}
</script>
