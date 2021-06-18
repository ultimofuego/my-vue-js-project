<template>
      <form class="card" @submit.prevent="submitForm">
        <h3>Add data to table</h3>
        <div class="form-group ">
          <label for="date">Select the date</label>
          <input v-model="rowData.date" class="input_field" type="date" id="userId" placeholder="Date" required>
        </div>
        <div class="form-group ">
          <label for="currency">Select the currency</label>
          <!-- <input v-model.trim="rowData.currency" class="ml-5" type="text" id="currency" placeholder="Currency" required> -->
          <select v-model="rowData.currency" id="currency" class="input_field" required>
            <option disabled value="">Type one</option>
            <option>EUR</option>
            <option>RUB</option>
            <option>USD</option>
          </select>
        </div>
        <div class="form-group">
          <label for="rate">Type an exchange rate</label>
          <input v-model.number="rowData.rate" class="input_field" type="text" id="rate" placeholder="Rate" required>
        </div>
        <button type="submit" class="submitButton" @click="check">Add row</button>
      </form>
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
        },
        error: false
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