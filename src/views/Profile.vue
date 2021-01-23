<template>
  <section class="section">
    <div>
      <p class="title">Select your school</p>
      <b-field>
        <b-select v-model="selectedSchool">
          <option v-for="(school, index) in userinfo.schools" :key="school.id" :value="index">{{school.name}}</option>
        </b-select>
      </b-field>
    </div>
    <div v-if="selectedSchool !== null">
      <hr>
      <p class="title">Select your group</p>
      <b-field>
        <b-select v-model="selectedGroup">
          <option v-for="(group, index) in userinfo.schools[selectedSchool].groups" :key="group.name" :value="index">{{group.name}}</option>
        </b-select>
      </b-field>
    </div>
    <div v-if="selectedSchool !== null && selectedGroup !== null">
      <hr>
      <p class="title">Apply changes</p>
      <b-button type="is-primary" @click="setProfile">Send</b-button>
    </div>
  </section>
</template>

<script>
import { setProfile } from "@/services/user.js"
export default {
  name: "Profile",
  data() {
    return {
      selectedSchool: null,
      selectedGroup: null
    }
  },
  methods: {
    setProfile: async function() {
      const profiledata = await setProfile(this.selectedSchool, this.selectedGroup)
      // Log in failed
      if (profiledata && profiledata.code == "C") {
        const profileinfo = profiledata.data.profileinfo
        this.$store.commit('setProfileinfo', profileinfo)
        localStorage.profileinfo = JSON.stringify(profileinfo)
        this.$router.push("/")
      }
      // Log in OK
      else {
        this.$buefy.dialog.alert({
          title: 'Error',
          message: profiledata.error,
          type: 'is-danger',
          ariaRole: 'alertdialog',
          ariaModal: true
        })
      }
    }
  },
  computed: {
      userinfo() {
          return this.$store.state.userinfo;
        }
    }
};
</script>
