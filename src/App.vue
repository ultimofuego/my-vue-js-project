<template>
  <div class="app">
    <div class="container">
      <form class="card" @submit.prevent="submitForm">
        <h3 class="mt-5">Добавление данных в таблицу</h3>
        <div class="form-group m-3">
          <label for="userId">Введите Id пользователя</label>
          <input v-model.number="rowData.userId" class="ml-5" type="text" id="userId" placeholder="UserId" required>
        </div>
        <div class="form-group m-3">
          <label for="title">Введите заголовок статьи</label>
          <input v-model.trim="rowData.title" class="ml-5" type="text" id="title" placeholder="Title" required>
        </div>
        <div class="form-group m-3 mb-4">
          <label for="titleBody">Введите статью</label>
          <input v-model.trim="rowData.body" class="ml-5" type="text" id="titleBody" placeholder="Title Body" required>
        </div>
        <button type="submit" class="btn btn-primary submit-btn">Добавить</button>
      </form>
    </div>

    <table v-if="allNotes.length > 0" table class="table table-sm">
      <thead>
          <tr>
            <th scope="col">userId</th>
            <th scope="col">title</th>
            <th scope="col">body</th>
          </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in allNotes" :key="index">
          <td>{{item.userId}}</td>
          <td>{{item.title}}</td>
          <td>{{item.body}}</td>
          <button class="btn btn-danger" @click="removeRow(index)">Remove</button>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert">No data</div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'App',

  data() {
    return {
      rowData: {
        userId: '',
        title: '',
        body: ''
      }
    }
  },
  computed: {
    ...mapGetters(["allNotes"])
  }, 

  async mounted() {
    this.$store.dispatch("fetchNotes")
  },

  methods: {
    submitForm() {
      this.$store.commit('addRow', this.rowData)
      this.rowData = {
        userId: '',
        title: '',
        body: ''
      }
    },
    removeRow(idx) {
      this.$store.commit('removeRow', idx)
    }
  }
} 

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.table {
  width: 1000px !important;
  margin: 100px auto;
}

.container {
  width: 700px !important;
}

label {
  float: left;
}

input {
  float: right;
  width: 350px;
}

.submit-btn {
  width: 200px;
  margin: 0 auto;
  margin-bottom: 30px;
}

</style>
