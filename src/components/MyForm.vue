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
            <label for="rateRUB">Type the currency</label>
            <input v-model.number="rowData.currency" class="input_field" type="text" id="rate" placeholder="Rate" required>
          </div>
          <div class="form-group">
            <label for="rateUSD">Type the rate</label>
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
          path: '/'
        })
        console.log(this.createArray())
        this.rowData = {
          date: '',
          currency: '',
          rate: ''
        }
      } else {
        this.rowData = {
          date: '',
          currency: '',
          rate: ''
        }
      }
    },
    badForm() {
      let found = this.allNotes.some(item => {
        return (item.date === this.rowData.date && item.currency === this.rowData.currency);
      })
      if(found) this.errors = true 
      else this.errors = false
    }
  }
  // createDates() {
  //   return this.allNotes.sort((a,b)=>a.date > b.date ? 1 : -1).map(a=>a.date)
  // },
  //if(this.$store.state.rowData[i].date === dates[i] && this.$store.state.rowData[i].currency === c)
}
</script>