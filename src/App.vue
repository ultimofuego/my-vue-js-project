<template>
    <div class="app">
      <router-view></router-view>
    </div>
</template>

<script>
  export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('fetchNotes')
  }
}
</script>
