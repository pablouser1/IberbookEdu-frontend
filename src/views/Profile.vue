<i18n>
{
  "en": {
    "school": "School",
    "group": "Group",
    "schoolFirst": "You need to choose a school first!",
    "selectSchool": "Select your school",
    "selectGroup": "Select your group",
    "notSchool": "You didn't choose a school",
    "notGroup": "You didn't choose a group",
    "apply": "Apply changes",
    "send": "Send"
  },
  "es": {
    "school": "Centro educativo",
    "group": "Grupo",
    "schoolFirst": "Necesitas elegir un centro primero",
    "selectSchool": "Selecciona tu centro",
    "selectGroup": "Selecciona tu grupo",
    "notSchool": "No elegiste un centro",
    "notGroup": "No elegiste un grupo",
    "apply": "Aplicar cambios",
    "send": "Enviar"
  }
}
</i18n>

<template>
  <section class="section">
    <b-steps
      v-model="activeStep"
      :animated="true"
      :rounded="true"
      :has-navigation="true"
      :label-position="'bottom'"
      :mobile-mode="'minimalist'">
      <b-step-item step="1" :label="$t('school')">
        <div class="container has-text-centered">
          <p class="title">{{ $t("selectSchool") }}</p>
          <b-field>
            <b-select v-model="selectedSchool">
              <option v-for="(school, index) in userinfo.schools" :key="school.id" :value="index">{{school.name}}</option>
            </b-select>
          </b-field>
          <b-field v-if="selectedSchool !== null">
            <b-button type="is-success" @click="activeStep++">Next</b-button>
          </b-field>
        </div>
      </b-step-item>

      <b-step-item step="2" :label="$t('group')">
        <div class="container has-text-centered" v-if="selectedSchool !== null">
          <p class="title">{{ $t("selectGroup") }}</p>
          <b-field>
            <b-select v-model="selectedGroup">
              <option v-for="(group, index) in userinfo.schools[selectedSchool].groups" :key="group.name" :value="index">{{group.name}}</option>
            </b-select>
          </b-field>
          <b-field v-if="selectedGroup !== null">
            <b-button type="is-success" @click="activeStep++">Next</b-button>
          </b-field>
        </div>
        <div class="container has-text-centered" v-else>
          <p>{{ $t("schoolFirst") }}</p>
        </div>
      </b-step-item>

      <b-step-item step="3" label="Confirm">
        <div class="container has-text-centered">
          <p class="title">{{ $t("apply") }}</p>
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">{{ userinfo.name }}</p>
            </header>
            <div class="card-content">
              <div class="content">
                <div>
                  <p v-if="selectedSchool !== null">{{ $t("school") }}: {{ userinfo.schools[selectedSchool].name }}</p>
                  <p v-else>{{ $t("notSchool") }}</p>
                </div>
                <div>
                  <p v-if="selectedGroup !== null">{{ $t("group") }}: {{ userinfo.schools[selectedSchool].groups[selectedGroup].name }}</p>
                  <p v-else> {{ $t("notGroup") }}</p>
                </div>
              </div>
              <b-button :disabled="selectedSchool === null || selectedGroup === null" type="is-primary" :loading="isLoading" @click="setProfile">Send</b-button>
            </div>
          </div>
        </div>
      </b-step-item>
      <!-- Custom navigation -->
      <template #navigation="{previous}">
        <b-button type="is-danger" icon-left="arrow-left" :disabled="previous.disabled" @click.prevent="previous.action">
          Previous
        </b-button>
      </template>
    </b-steps>
  </section>
</template>

<script>
import { setProfile } from "@/services/user.js"
export default {
  name: "Profile",
  data() {
    return {
      activeStep: 0,
      selectedSchool: null,
      selectedGroup: null,
      isLoading: false
    }
  },
  methods: {
    setProfile: async function() {
      this.isLoading = true
      const profiledata = await setProfile(this.selectedSchool, this.selectedGroup)
      // Login is successful
      if (profiledata && profiledata.code == "C") {
        const profileinfo = profiledata.data.profileinfo
        this.$store.commit('setProfileinfo', profileinfo)
        localStorage.profileinfo = JSON.stringify(profileinfo)
        this.$router.push("/")
      }
      // Log failed
      else {
        this.$buefy.dialog.alert({
          title: 'Error',
          message: profiledata.error,
          type: 'is-danger',
          ariaRole: 'alertdialog',
          ariaModal: true
        })
      }
      this.isLoading = false
    }
  },
  computed: {
      userinfo() {
          return this.$store.state.userinfo;
        }
    }
};
</script>
