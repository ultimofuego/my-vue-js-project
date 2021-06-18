<template>
      <form class="card" @submit.prevent="submitForm">
        <h3>Add data to table</h3>
        <div class="form-group ">
          <label for="date">Select the date</label>
          <input v-model="rowData.date" class="input_field" type="date" id="userId" placeholder="Date" required>
        </div>
        <div class="form-group">
          <label for="rateRUB">Type RUB rate</label>
          <input v-model.number="rowData.rateRUB" class="input_field" type="text" id="rate" placeholder="Rate" required>
        </div>
        <div class="form-group">
          <label for="rateUSD">Type USD rate</label>
          <input v-model.number="rowData.rateUSD" class="input_field" type="text" id="rate" placeholder="Rate" required>
        </div>
        <div class="form-group">
          <label for="rateEUR">Type EUR rate</label>
          <input v-model.number="rowData.rateEUR" class="input_field" type="text" id="rate" placeholder="Rate" required>
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
          rateRUB: '',
          rateUSD: '',
          rateEUR: ''
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
        rateRUB: '',
        rateUSD: '',
        rateEUR: ''
      }
    }
  }
}
</script>