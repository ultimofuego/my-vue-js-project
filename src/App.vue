<template>
    <div class="app">
      <router-view v-if="loading"></router-view>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
  data() {
    return {
      loading: false
    }
  },
  name: 'App',
  mounted() {
    axios.get('https://ultimofuego-47283-default-rtdb.firebaseio.com/notes.json')
    .then(res => {
      res = Object.keys(res.data).map(key => {
        return {
          id: key,
          value: res.data[key]
        }
      })
      for(let i = 0; i < res.length; i++)
      {
        this.$store.commit('addRow', res[i].value) 
      }
      this.loading = true
      console.log(this.$store.state.rowData)
    })
    //this.$store.dispatch('fetchNotes')
  }
}
</script>
