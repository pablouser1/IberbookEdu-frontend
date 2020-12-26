<template>
    <div class="container has-text-centered">
        <b-field label="Ordenar por">
            <b-select v-model="sortValue">
                <option selected value="votes">Votos</option>
                <option value="schoolyear">Curso</option>
                <option value="acyear">Año académico</option>
                <option value="schoolname">Centro escolar</option>
            </b-select>
        </b-field>
    </div>
</template>

<script>
export default {
    name: "SearchYB",
    data() {
        return {
            sortValue: "votes", // Default
        }
    },
    watch: {
        sortValue: function(sortby) {
            this.$emit('change-sort', sortby)
        }
    }
}
</script>