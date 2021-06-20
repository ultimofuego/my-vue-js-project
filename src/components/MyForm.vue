<template>
      <form class="card" @submit.prevent="submitForm">
        <h3>Add data to table</h3>
        <div v-if="errors" class="alert">
          <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
          This date already exists
        </div>
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
      },
      errors: false
    }
  },
  
  computed: {
    ...mapGetters(["allNotes"]),
  },

  methods: {
    submitForm() {
      this.badForm()
      if(!this.errors) {
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
      } else {
        this.rowData = {
          date: '',
          rateRUB: '',
          rateUSD: '',
          rateEUR: ''
        }
      }
      console.log(this.errors)
    },
    badForm() {
      let found = this.allNotes.some(item => {
        return item.date === this.rowData.date;
      })
      if(found) this.errors = true 
      else this.errors = false
    }
  }
}
</script>