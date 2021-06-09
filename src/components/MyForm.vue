<template>
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
</template>

<script>
export default {
    data() {
    return {
      rowData: {
        userId: '',
        title: '',
        body: ''
      }
    }
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
    }
  }
}
</script>