<i18n>
{
  "en": {
    "madewith": "Made with <3 in Github"
  },
  "es": {
    "madewith": "Hecho con <3 en Github"
  }
}
</i18n>

<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <nav class="breadcrumb is-centered" aria-label="breadcrumbs">
        <ul>
          <li><a v-on:click="changelang('en')">🇬🇧 English</a></li>
          <li><a v-on:click="changelang('es')">🇪🇸 Español</a></li>
          <li><a v-on:click="changelang('fr')">🇫🇷 Français</a></li>
        </ul>
      </nav>
      <p>{{ $t("madewith") }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    changelang: function(lang) {
      if (lang === "fr") {
        this.$buefy.toast.open("This language is not supported yet")
      }
      else {
        this.$root.$i18n.locale = lang
      }
    }
  }
}
</script>