<template>
    <div class="container">
      <form class="card" @submit.prevent="submitForm">
        <h3 class="mt-5">Добавление данных в таблицу</h3>
        <div class="form-group m-3">
          <label for="date">Введите дату</label>
          <input v-model="rowData.date" class="ml-5" type="date" id="userId" placeholder="Date" required>
        </div>
        <div class="form-group m-3">
          <label for="title">Введите валюту</label>
          <input v-model.trim="rowData.currency" class="ml-5" type="text" id="currency" placeholder="Currency" required>
        </div>
        <div class="form-group m-3 mb-4">
          <label for="titleBody">Введите курс</label>
          <input v-model.number="rowData.rate" class="ml-5" type="text" id="rate" placeholder="Rate" required>
        </div>
        <button type="submit" class="btn btn-primary submit-btn" @click="check">Добавить</button>
      </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
//import axios from 'axios'

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
      //this.$store.commit('addRow', this.rowData)
      this.$store.dispatch('pushtoDB', this.rowData)
      this.$router.push({
          path: '/',
          query: {
              page: this.$route.path
          }
      })
      //this.$store.commit('dataPlot',this.rowData)

      this.rowData = {
        date: '',
        currency: '',
        rate: ''
      }
    }
    // dataX() {
    //   const temp = this.allNotes
    //   const filteredTempEUR = temp.filter(cur => cur.currency==="EUR").sort((a, b) => a.date > b.date ? 1 : -1)
    //   const filteredTempRUB = temp.filter(cur => cur.currency==="RUB").sort((a, b) => a.date > b.date ? 1 : -1)
    //   const filteredTempUSD = temp.filter(cur => cur.currency==="USD").sort((a, b) => a.date > b.date ? 1 : -1)
    //   return {
    //     xEUR: filteredTempEUR.map(a=>a.date),
    //     yEUR: filteredTempEUR.map(a=>a.rate),
    //     xRUB: filteredTempRUB.map(a=>a.date),
    //     yRUB: filteredTempRUB.map(a=>a.rate),
    //     xUSD: filteredTempUSD.map(a=>a.date),
    //     yUSD: filteredTempUSD.map(a=>a.rate)
    //   }
    // }
  }
}
</script>