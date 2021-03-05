<i18n>
{
  "en": {
    "hi": "Hi! 👋",
    "welcome": "Welcome to IberbookEdu, version {version}",
    "intro": "This is an open source project ({github}) created for fun under the {license} license.",
    "thirdparty": "Third party programs used:",
    "data": {
      "question": "What data does the program get?",
      "answer": "IberbookEdu only recollects your name, school, school year and the photo, video, quote and link you upload.",
      "note": "This info is only used in order to make the program work."
    },
    "yearbook": {
      "question": "Where is my yearbook?",
      "answer": "Once your group administrator generates it, you can find it on the Yearbooks section or by visiting your dashboard"
    }
  },
  "es": {
    "hi": "¡Hola! 👋",
    "welcome": "Bienvenido a IberbookEdu, versión {version}",
    "intro": "Este es un proyecto de código abierto ({github}) creado por diversión bajo la licencia {license}.",
    "thirdparty": "Programas de terceros usados:",
    "data": {
      "question": "¿Qué datos recopila el programa?",
      "answer": "IberbookEdu sólo recopila tu nombre, centro escolar, grupo y la foto, vídeo, cita y enlace que subas.",
      "note": "Esta información es usada únicamente para el funcionamiento del programa."
    },
    "yearbook": {
      "question": "¿Dónde está mi orla?",
      "answer": "Cuando el administrador de tu grupo la genere, la puedes encontrar en la sección de orlas o en tu panel de control"
    }
  }
}
</i18n>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ $t("hi") }}</h1>
      <p>{{ $t("welcome", {version: app_version}) }}</p>
      <i18n path="intro" tag="p">
        <template v-slot:github>
          <a href="https://github.com/pablouser1/IberbookEdu-frontend">Source</a>
        </template>
        <template v-slot:license>
          <a href="https://www.gnu.org/licenses/agpl-3.0-standalone.html">AGPLv3</a>
        </template>
      </i18n>
    </div>
    <hr />
    <div class="container">
      <h1 class="title">FAQ</h1>
      <h2 class="title is-4">{{ $t("data.question") }}</h2>
      <p>
        {{ $t("data.answer") }}
      </p>
      <p>{{ $t("data.note") }}</p>
      <h2 class="title is-4 pt-4">{{ $t("yearbook.question") }}</h2>
      <p>{{ $t("yearbook.answer") }}</p>
    </div>
    <hr>
    <div class="container">
      <h1 class="title">{{ $t("thirdparty") }}</h1>
      <ul>
        <li>Vue.js (<a href="https://vuejs.org" rel="nofollow">link</a>) <a href="https://github.com/vuejs/vue/blob/dev/LICENSE">MIT LICENSE</a></li>
        <li>Bulma (<a href="https://bulma.io" rel="nofollow">link</a>) <a href="https://github.com/jgthms/bulma/blob/master/LICENSE">MIT LICENSE</a></li>
        <li>Buefy (<a href="https://buefy.org" rel="nofollow">link</a>) <a href="https://github.com/buefy/buefy/blob/dev/LICENSE">MIT LICENSE</a></li>
        <li>Spinkit (<a href="https://tobiasahlin.com/spinkit" rel="nofollow">link</a>) <a href="https://github.com/tobiasahlin/SpinKit/blob/master/LICENSE">MIT LICENSE</a></li>
      </ul>
      <br>
      <p>Assets:</p>
      <ul>
        <li>Favicon: Fabián Alexis / <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA</a></li>
      </ul>
      <br>
    </div>
    <hr>
    <div class="container">
      <h1 class="title">Credits:</h1>
      <span>
        Pablo Ferreiro Romero (Project leader)
        <a href="https://twitter.com/pablouser1" target="_blank" rel="nofollow">@pablouser1</a>
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      app_version: process.env.VUE_APP_VERSION
    }
  }
}
</script>
