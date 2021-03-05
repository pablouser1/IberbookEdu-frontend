<i18n>
{
    "en": {
        "sortby": "Sort by",
        "votes": "Votes",
        "schoolyear": "School year",
        "acyear": "Academic year",
        "schoolname": "School name"
    },
    "es": {
        "sortby": "Ordenar por",
        "votes": "Votos",
        "schoolyear": "Curso",
        "acyear": "Año académico",
        "schoolname": "Centro escolar"
    }
}
</i18n>

<template>
    <div class="container has-text-centered">
        <b-field :label="$t('sortby')">
            <b-select v-model="sortValue">
                <option selected value="votes">{{ $t("votes") }}</option>
                <option value="schoolyear">{{ $t("schoolyear") }}</option>
                <option value="acyear">{{ $t("acyear") }}</option>
                <option value="schoolname">{{ $t("schoolname") }}</option>
            </b-select>
        </b-field>
    </div>
</template>

<script>
export default {
  name: 'SearchYB',
  data () {
    return {
      sortValue: 'votes' // Default
    }
  },
  watch: {
    sortValue: function (sortby) {
      this.$emit('change-sort', sortby)
    }
  }
}
</script>
