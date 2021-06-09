<template>
  <div class="app">
    <my-form></my-form>
    <my-table></my-table>
  </div>
</template>

<script>

import MyForm from './components/MyForm.vue'
import MyTable from './components/MyTable.vue'

export default {
  name: 'App',

  components: {
    'my-form': MyForm,
    'my-table': MyTable
  }
} 
</script>
