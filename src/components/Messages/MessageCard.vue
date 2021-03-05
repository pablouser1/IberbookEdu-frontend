<template>
  <article class="media">
    <div class="media-content">
      <div class="content">
        <p>
          <span>
            <strong>{{ name }}</strong> / <small>{{ date }}</small>
          </span>
          <br />
          {{ message }}
        </p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'MessageCard',
  props: ['name', 'date', 'message']
}
</script>
