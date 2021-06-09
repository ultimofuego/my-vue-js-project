<template>
    <div class="app">
      <router-view></router-view>
    </div>
</template>

<script>
  export default {
      name: 'App',
      async mounted() {
      this.$store.dispatch("fetchNotes")
    },
  }
</script>
