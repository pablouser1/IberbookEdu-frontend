<i18n>
{
    "en": {
        "profile": "Change profile"
    },
    "es": {
        "profile": "Cambiar perfil"
    }
}
</i18n>

<template>
    <section class="section">
        <router-link class="button is-info" to="/profile" tag="button">
            <b-icon icon="swap-horizontal"></b-icon>
            <span>{{ $t("profile") }}</span>
        </router-link>
    </section>
</template>

<script>
export default {
    name: "User"
}
</script>
