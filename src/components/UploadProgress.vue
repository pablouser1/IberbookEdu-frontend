<i18n>
{
  "en": {
    "title": "Uploading {type}",
    "completed": "{percent}% completed"
  },
  "es": {
    "title": "Subiendo {type}",
    "completed": "{percent}% completado"
  }
}
</i18n>

<template>
  <div>
    <i18n path="title" tag="p">
      <template #type>
        <span>{{ progress.type }}</span>
      </template>
    </i18n>
    <b-progress type="is-success" :max="progress.total" :value="progress.current" show-value format="percent">
        <i18n path="completed" tag="span">
            <template #percent>
                <span>{{ showPercentage }}</span>
            </template>
        </i18n>  
    </b-progress>
  </div>
</template>

<script>
export default {
  name: "UploadProgress",
  props: ["progress"],
  computed: {
    showPercentage() {
      return Math.round((this.progress.current / this.progress.total)*100)
    },
  },
};
</script>
