<i18n>
{
  "en": {
    "madewith": "Made with {heart} in Github",
    "languages": "Languages"
  },
  "es": {
    "madewith": "Hecho con {heart} en Github",
    "languages": "Idiomas"
  }
}
</i18n>

<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>IberbookEdu Version: {{app_version}}</p>
      <p>
        <b-dropdown aria-role="list">
          <button class="button is-primary" slot="trigger" slot-scope="{ active }">
            <span>{{ $t("languages") }}</span>
            <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
          </button>
          <b-dropdown-item @click="changelang('en')" aria-role="listitem">🇬🇧 English</b-dropdown-item>
          <b-dropdown-item @click="changelang('es')" aria-role="listitem">🇪🇸 Español</b-dropdown-item>
        </b-dropdown>
      </p>
      <i18n path="madewith" tag="p">
        <template v-slot:heart>
          <span style="color: #e25555;">&#9829;</span>
        </template>
      </i18n>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      app_version: process.env.VUE_APP_VERSION
    }
  },
  methods: {
    changelang: function(lang) {
      this.$root.$i18n.locale = lang
    }
  }
}
</script>
