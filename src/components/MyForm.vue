<template>
    <div class="container">
      <form class="card" @submit.prevent="submitForm">
        <h3 class="mt-5">Добавление данных в таблицу</h3>
        <div class="form-group m-3">
          <label for="date">Введите дату</label>
          <input v-model="rowData.date" class="ml-5" type="date" id="userId" placeholder="Date" required>
        </div>
        <div class="form-group m-3">
          <label for="currency">Введите валюту</label>
          <!-- <input v-model.trim="rowData.currency" class="ml-5" type="text" id="currency" placeholder="Currency" required> -->
          <select v-model="rowData.currency" id="currency" class="ml-5" required>
            <option disabled value="">Выберите один из вариантов</option>
            <option>EUR</option>
            <option>RUB</option>
            <option>USD</option>
          </select>
        </div>
        <div class="form-group m-3 mb-4">
          <label for="rate">Введите курс</label>
          <input v-model.number="rowData.rate" class="ml-5" type="text" id="rate" placeholder="Rate" required>
        </div>
        <button type="submit" class="btn btn-primary submit-btn" @click="check">Добавить</button>
      </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
      return {
        rowData: {
          date: '',
          currency: '',
          rate: ''
        }
    }
  },
  
  computed: {
    ...mapGetters(["allNotes"]),
  },

  methods: {
    submitForm() {
      this.$store.dispatch('pushtoDB', this.rowData)
      this.$router.push({
          path: '/',
          query: {
              page: this.$route.path
          }
      })

      this.rowData = {
        date: '',
        currency: '',
        rate: ''
      }
    }
  }
}
</script>